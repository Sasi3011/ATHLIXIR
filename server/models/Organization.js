import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['sports_team', 'medical_facility', 'school', 'university', 'fitness_center', 'other'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: '',
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      phone: String,
      website: String,
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
      },
    },
    administrators: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    members: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['athlete', 'coach', 'medical_staff'],
      },
      joinDate: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
      },
    }],
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'basic', 'premium', 'enterprise'],
        default: 'free',
      },
      startDate: Date,
      endDate: Date,
      status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
      },
    },
    settings: {
      privacyLevel: {
        type: String,
        enum: ['public', 'private', 'restricted'],
        default: 'private',
      },
      dataRetentionPeriod: Number,
      notificationPreferences: {
        email: Boolean,
        push: Boolean,
        sms: Boolean,
      },
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    documents: [{
      type: {
        type: String,
        enum: ['license', 'certification', 'insurance', 'other'],
      },
      name: String,
      fileUrl: String,
      expiryDate: Date,
      verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending',
      },
    }],
    analytics: {
      totalAthletes: {
        type: Number,
        default: 0,
      },
      totalRecords: {
        type: Number,
        default: 0,
      },
      monthlyActiveUsers: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
organizationSchema.index({ name: 1 });
organizationSchema.index({ 'members.user': 1 });
organizationSchema.index({ verificationStatus: 1 });

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization; 