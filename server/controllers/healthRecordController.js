import HealthRecord from '../models/HealthRecord.js';
import { analyzeDocumentAuthenticity } from '../utils/aiService.js';

// @desc    Create a new health record
// @route   POST /api/records
// @access  Private
const createHealthRecord = async (req, res) => {
  try {
    const {
      recordType,
      title,
      description,
      date,
      provider,
      diagnosis,
      treatment,
      followUp,
    } = req.body;

    const healthRecord = await HealthRecord.create({
      athlete: req.user._id,
      recordType,
      title,
      description,
      date,
      provider,
      diagnosis,
      treatment,
      followUp,
    });

    res.status(201).json(healthRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all health records
// @route   GET /api/records
// @access  Private
const getHealthRecords = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    const count = await HealthRecord.countDocuments({ ...keyword });
    const healthRecords = await HealthRecord.find({ ...keyword })
      .populate('athlete', 'name email')
      .populate('verifiedBy', 'name role')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ date: -1 });

    res.json({
      healthRecords,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get health record by ID
// @route   GET /api/records/:id
// @access  Private
const getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id)
      .populate('athlete', 'name email')
      .populate('verifiedBy', 'name role');

    if (healthRecord) {
      // Log access
      healthRecord.accessLog.push({
        user: req.user._id,
        action: 'view',
        timestamp: Date.now(),
        ipAddress: req.ip,
      });
      await healthRecord.save();

      res.json(healthRecord);
    } else {
      res.status(404);
      throw new Error('Health record not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update health record
// @route   PUT /api/records/:id
// @access  Private
const updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);

    if (healthRecord) {
      healthRecord.title = req.body.title || healthRecord.title;
      healthRecord.description = req.body.description || healthRecord.description;
      healthRecord.date = req.body.date || healthRecord.date;
      healthRecord.provider = req.body.provider || healthRecord.provider;
      healthRecord.diagnosis = req.body.diagnosis || healthRecord.diagnosis;
      healthRecord.treatment = req.body.treatment || healthRecord.treatment;
      healthRecord.followUp = req.body.followUp || healthRecord.followUp;

      // Log update
      healthRecord.accessLog.push({
        user: req.user._id,
        action: 'update',
        timestamp: Date.now(),
        ipAddress: req.ip,
      });

      const updatedHealthRecord = await healthRecord.save();
      res.json(updatedHealthRecord);
    } else {
      res.status(404);
      throw new Error('Health record not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Delete health record
// @route   DELETE /api/records/:id
// @access  Private
const deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);

    if (healthRecord) {
      // Soft delete by archiving
      healthRecord.isArchived = true;
      healthRecord.accessLog.push({
        user: req.user._id,
        action: 'delete',
        timestamp: Date.now(),
        ipAddress: req.ip,
      });
      await healthRecord.save();

      res.json({ message: 'Health record archived' });
    } else {
      res.status(404);
      throw new Error('Health record not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Verify health record
// @route   POST /api/records/:id/verify
// @access  Private/Medical Staff
const verifyHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);

    if (healthRecord) {
      healthRecord.verificationStatus = 'verified';
      healthRecord.verifiedBy = req.user._id;
      healthRecord.verificationDate = Date.now();

      healthRecord.accessLog.push({
        user: req.user._id,
        action: 'verify',
        timestamp: Date.now(),
        ipAddress: req.ip,
      });

      const updatedHealthRecord = await healthRecord.save();
      res.json(updatedHealthRecord);
    } else {
      res.status(404);
      throw new Error('Health record not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Analyze health record using AI
// @route   POST /api/records/:id/analyze
// @access  Private
const analyzeHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);

    if (healthRecord) {
      const analysis = await analyzeDocumentAuthenticity(healthRecord);
      
      healthRecord.aiAnalysis = analysis;
      healthRecord.accessLog.push({
        user: req.user._id,
        action: 'analyze',
        timestamp: Date.now(),
        ipAddress: req.ip,
      });

      const updatedHealthRecord = await healthRecord.save();
      res.json(updatedHealthRecord);
    } else {
      res.status(404);
      throw new Error('Health record not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get health record statistics
// @route   GET /api/records/stats
// @access  Private
const getHealthRecordStats = async (req, res) => {
  try {
    const totalRecords = await HealthRecord.countDocuments();
    const verifiedRecords = await HealthRecord.countDocuments({
      verificationStatus: 'verified',
    });
    const pendingRecords = await HealthRecord.countDocuments({
      verificationStatus: 'pending',
    });
    const rejectedRecords = await HealthRecord.countDocuments({
      verificationStatus: 'rejected',
    });

    const recordsByType = await HealthRecord.aggregate([
      {
        $group: {
          _id: '$recordType',
          count: { $sum: 1 },
        },
      },
    ]);

    const recordsByMonth = await HealthRecord.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 },
    ]);

    res.json({
      totalRecords,
      verifiedRecords,
      pendingRecords,
      rejectedRecords,
      recordsByType,
      recordsByMonth,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export {
  createHealthRecord,
  getHealthRecords,
  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord,
  verifyHealthRecord,
  analyzeHealthRecord,
  getHealthRecordStats,
}; 