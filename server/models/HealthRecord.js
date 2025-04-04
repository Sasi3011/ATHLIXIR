import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema(
  {
    athlete: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recordType: {
      type: String,
      enum: ['injury', 'medical_exam', 'vaccination', 'treatment', 'prescription', 'other'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    provider: {
      name: String,
      specialization: String,
      institution: String,
      contactInfo: String,
    },
    attachments: [{
      fileName: String,
      fileType: String,
      fileUrl: String,
      uploadDate: Date,
    }],
    diagnosis: {
      condition: String,
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
      },
      notes: String,
    },
    treatment: {
      plan: String,
      duration: String,
      medications: [{
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date,
      }],
      recommendations: [String],
    },
    followUp: {
      required: Boolean,
      date: Date,
      notes: String,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    verificationDate: Date,
    aiAnalysis: {
      authenticity: {
        score: Number,
        flags: [String],
      },
      recommendations: [String],
    },
    accessLog: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      action: String,
      timestamp: Date,
      ipAddress: String,
    }],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
healthRecordSchema.index({ athlete: 1, date: -1 });
healthRecordSchema.index({ verificationStatus: 1 });

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

export default HealthRecord; 