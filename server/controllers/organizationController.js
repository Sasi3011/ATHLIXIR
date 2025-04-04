import Organization from '../models/Organization.js';
import User from '../models/User.js';

// @desc    Create a new organization
// @route   POST /api/organizations
// @access  Private/Admin
const createOrganization = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      contact,
      settings,
      subscription,
    } = req.body;

    const organizationExists = await Organization.findOne({ name });

    if (organizationExists) {
      res.status(400);
      throw new Error('Organization already exists');
    }

    const organization = await Organization.create({
      name,
      type,
      description,
      contact,
      settings,
      subscription,
      administrators: [req.user._id],
    });

    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all organizations
// @route   GET /api/organizations
// @access  Private
const getOrganizations = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    const count = await Organization.countDocuments({ ...keyword });
    const organizations = await Organization.find({ ...keyword })
      .populate('administrators', 'name email')
      .populate('members.user', 'name email role')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      organizations,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get organization by ID
// @route   GET /api/organizations/:id
// @access  Private
const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id)
      .populate('administrators', 'name email')
      .populate('members.user', 'name email role');

    if (organization) {
      res.json(organization);
    } else {
      res.status(404);
      throw new Error('Organization not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update organization
// @route   PUT /api/organizations/:id
// @access  Private/Admin
const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (organization) {
      organization.name = req.body.name || organization.name;
      organization.type = req.body.type || organization.type;
      organization.description = req.body.description || organization.description;
      organization.logo = req.body.logo || organization.logo;
      organization.contact = req.body.contact || organization.contact;
      organization.settings = req.body.settings || organization.settings;
      organization.subscription = req.body.subscription || organization.subscription;

      const updatedOrganization = await organization.save();
      res.json(updatedOrganization);
    } else {
      res.status(404);
      throw new Error('Organization not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Delete organization
// @route   DELETE /api/organizations/:id
// @access  Private/Admin
const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (organization) {
      // Remove organization reference from all members
      await User.updateMany(
        { organization: organization._id },
        { $unset: { organization: 1 } }
      );

      await organization.remove();
      res.json({ message: 'Organization removed' });
    } else {
      res.status(404);
      throw new Error('Organization not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Add member to organization
// @route   POST /api/organizations/:id/members
// @access  Private/Admin
const addMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const organization = await Organization.findById(req.params.id);
    const user = await User.findById(userId);

    if (!organization || !user) {
      res.status(404);
      throw new Error('Organization or user not found');
    }

    // Check if user is already a member
    const isMember = organization.members.some(
      (member) => member.user.toString() === userId
    );

    if (isMember) {
      res.status(400);
      throw new Error('User is already a member');
    }

    organization.members.push({
      user: userId,
      role,
      joinDate: Date.now(),
    });

    // Update user's organization reference
    user.organization = organization._id;
    await user.save();

    // Update organization analytics
    if (role === 'athlete') {
      organization.analytics.totalAthletes += 1;
    }

    const updatedOrganization = await organization.save();
    res.json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Remove member from organization
// @route   DELETE /api/organizations/:id/members
// @access  Private/Admin
const removeMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const organization = await Organization.findById(req.params.id);
    const user = await User.findById(userId);

    if (!organization || !user) {
      res.status(404);
      throw new Error('Organization or user not found');
    }

    const memberIndex = organization.members.findIndex(
      (member) => member.user.toString() === userId
    );

    if (memberIndex === -1) {
      res.status(400);
      throw new Error('User is not a member');
    }

    const removedMember = organization.members[memberIndex];

    // Update organization analytics
    if (removedMember.role === 'athlete') {
      organization.analytics.totalAthletes -= 1;
    }

    organization.members.splice(memberIndex, 1);

    // Remove organization reference from user
    user.organization = undefined;
    await user.save();

    const updatedOrganization = await organization.save();
    res.json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update member role
// @route   PUT /api/organizations/:id/members/:userId/role
// @access  Private/Admin
const updateMemberRole = async (req, res) => {
  try {
    const { role } = req.body;
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      res.status(404);
      throw new Error('Organization not found');
    }

    const member = organization.members.find(
      (m) => m.user.toString() === req.params.userId
    );

    if (!member) {
      res.status(404);
      throw new Error('Member not found');
    }

    // Update organization analytics if role changes to/from athlete
    if (member.role === 'athlete' && role !== 'athlete') {
      organization.analytics.totalAthletes -= 1;
    } else if (member.role !== 'athlete' && role === 'athlete') {
      organization.analytics.totalAthletes += 1;
    }

    member.role = role;

    const updatedOrganization = await organization.save();
    res.json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get organization statistics
// @route   GET /api/organizations/stats
// @access  Private/Admin
const getOrganizationStats = async (req, res) => {
  try {
    const totalOrganizations = await Organization.countDocuments();
    const totalAthletes = await User.countDocuments({ role: 'athlete' });
    const totalCoaches = await User.countDocuments({ role: 'coach' });
    const totalMedicalStaff = await User.countDocuments({ role: 'medical_staff' });

    const organizationsByType = await Organization.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);

    const membershipTrends = await Organization.aggregate([
      {
        $unwind: '$members',
      },
      {
        $group: {
          _id: {
            year: { $year: '$members.joinDate' },
            month: { $month: '$members.joinDate' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.json({
      totalOrganizations,
      totalAthletes,
      totalCoaches,
      totalMedicalStaff,
      organizationsByType,
      membershipTrends,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  addMember,
  removeMember,
  updateMemberRole,
  getOrganizationStats,
}; 