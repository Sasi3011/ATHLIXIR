import express from 'express';
import {
  createHealthRecord,
  getHealthRecords,
  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord,
  verifyHealthRecord,
  analyzeHealthRecord,
  getHealthRecordStats,
} from '../controllers/healthRecordController.js';
import { protect, medicalStaff } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createHealthRecord)
  .get(protect, getHealthRecords);

router.get('/stats', protect, getHealthRecordStats);

router.route('/:id')
  .get(protect, getHealthRecordById)
  .put(protect, updateHealthRecord)
  .delete(protect, deleteHealthRecord);

router.post('/:id/verify', protect, medicalStaff, verifyHealthRecord);
router.post('/:id/analyze', protect, analyzeHealthRecord);

export default router; 