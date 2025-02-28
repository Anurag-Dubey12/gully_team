// vendorRoutes.js
import express from 'express';
import VendorController from '../controllers/vendorController.js';
import validateUser from '../middlewares/validateUser.js';

const router = express.Router();

// Change the endpoint for creating a vendor to /register
router.post('/register', validateUser, VendorController.createVendor);
router.get('/', validateUser, VendorController.getAllVendors);
router.get('/:id', validateUser, VendorController.getVendorById);
router.put('/:id', validateUser, VendorController.editVendor);
router.delete('/:id', validateUser, VendorController.deleteVendor);

export default router;
