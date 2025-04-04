import express from 'express';
import {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  addMember,
  removeMember,
  updateMemberRole,
  getOrganizationStats,
} from '../controllers/organizationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createOrganization)
  .get(protect, getOrganizations);

router.get('/stats', protect, admin, getOrganizationStats);

router.route('/:id')
  .get(protect, getOrganizationById)
  .put(protect, admin, updateOrganization)
  .delete(protect, admin, deleteOrganization);

router.route('/:id/members')
  .post(protect, admin, addMember)
  .delete(protect, admin, removeMember);

router.put('/:id/members/:userId/role', protect, admin, updateMemberRole);

export default router; 