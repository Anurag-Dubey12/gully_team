// controllers/vendorController.js
import CustomErrorHandler from '../helpers/CustomErrorHandler.js';
import VendorService from '../services/vendorService.js';

// Function to validate email format
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Function to validate required fields
const validateRequiredFields = (fields) => {
    for (const { field, value } of fields) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            return `${field} cannot be empty`;
        }
    }
    return null;
};

// Create Vendor
export const createVendor = async (req, res, next) => {
    const {
        name, address, phoneNumber, email, identityProof, category,
        description, experience, duration, fees, serviceType, serviceImages
    } = req.body;

    // Check service type validity
    if (serviceType !== 'online' && serviceType !== 'offline') {
        return next(CustomErrorHandler.badRequest('Service type must be either "online" or "offline"'));
    }

    // Validate required fields
    const requiredFields = [
        { field: 'name', value: name },
        { field: 'phoneNumber', value: phoneNumber },
        { field: 'email', value: email },
        { field: 'identityProof', value: identityProof },
        { field: 'category', value: category },
        { field: 'description', value: description },
        { field: 'experience', value: experience },
        { field: 'duration', value: duration },
        { field: 'fees', value: fees },
        { field: 'serviceImages', value: serviceImages }
    ];

    const validationError = validateRequiredFields(requiredFields);
    if (validationError) {
        return next(CustomErrorHandler.badRequest(validationError));
    }

    // Validate email format
    if (!validateEmail(email)) {
        return next(CustomErrorHandler.badRequest('Invalid email format'));
    }

    // Validate address for offline service
    if (serviceType === 'offline' && (!address || address.trim() === '')) {
        return next(CustomErrorHandler.badRequest('Address cannot be empty for offline service'));
    }

    try {
        const vendorData = {
            name,
            address,
            phoneNumber,
            email,
            identityProof,
            category,
            description,
            experience,
            duration,
            fees,
            serviceType,
            serviceImages,
            userId: req.user.userId // Fetching userId from validated token
        };

        const vendor = await VendorService.createVendor(vendorData);
        return res.status(201).json({
            status: true,
            message: "Vendor created successfully",
            data: {
                vendor: {
                    ...vendor.toObject()
                }
            }
        });
    } catch (error) {
        return next(error);
    }
};
// // Create Vendor
// export const createVendor = async (req, res, next) => {
//     const {
//         name, address, phoneNumber, email, identityProof, category,
//         description, experience, duration, fees, serviceType, serviceImages
//     } = req.body;

//     // Check service type validity
//     if (serviceType !== 'online' && serviceType !== 'offline') {
//         return next(CustomErrorHandler.badRequest('Service type must be either "online" or "offline"'));
//     }

//     // Validate required fields
//     const requiredFields = [
//         { field: 'name', value: name },
//         { field: 'phoneNumber', value: phoneNumber },
//         { field: 'email', value: email },
//         { field: 'identityProof', value: identityProof },
//         { field: 'category', value: category },
//         { field: 'description', value: description },
//         { field: 'experience', value: experience },
//         { field: 'duration', value: duration },
//         { field: 'fees', value: fees },
//         { field: 'serviceImages', value: serviceImages }
//     ];

//     const validationError = validateRequiredFields(requiredFields);
//     if (validationError) {
//         return next(CustomErrorHandler.badRequest(validationError));
//     }

//     // Validate email format
//     if (!validateEmail(email)) {
//         return next(CustomErrorHandler.badRequest('Invalid email format'));
//     }

//     // Validate address for offline service
//     if (serviceType === 'offline' && (!address || address.trim() === '')) {
//         return next(CustomErrorHandler.badRequest('Address cannot be empty for offline service'));
//     }

//     try {
//         const vendorData = {
//             name,
//             address,
//             phoneNumber,
//             email,
//             identityProof,
//             category,
//             description,
//             experience,
//             duration,
//             fees,
//             serviceType,
//             serviceImages,
//             userId: req.user.userId // Fetching userId from validated token
//         };

//         const vendor = await VendorService.createVendor(vendorData);
//         return res.status(201).json({
//             status: true,
//             message: "Vendor created successfully",
//             data: {
//                 vendor: {
//                     ...vendor.toObject()
//                 }
//             }
//         });
//     } catch (error) {
//         return next(error);
//     }
// };

// Get All Vendors
export const getAllVendors = async (req, res, next) => {
    try {
        const vendors = await VendorService.getAllVendors();
        return res.status(200).json({
            status: true,
            message: "Vendors fetched successfully",
            data: {
                vendors: vendors.map(vendor => vendor.toObject())
            }
        });
    } catch (error) {
        return next(error);
    }
};

// Get Vendor by ID
export const getVendorById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const vendor = await VendorService.getVendorById(id);
        if (!vendor || vendor.isVendorDeleted) {
            return next(CustomErrorHandler.notFound('Vendor not found or has been deleted'));
        }
        return res.status(200).json({
            status: true,
            message: "Vendor fetched successfully",
            data: {
                vendor: {
                    ...vendor.toObject()
                }
            }
        });
    } catch (error) {
        return next(error);
    }
};

// Helper function to validate phone number
const isValidPhoneNumber = (number) => {
    return /^\d{10}$/.test(number); // Validates that the phone number is exactly 10 digits
};

// Helper function to validate if the value is numeric
const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
};

// // Edit Vendor
// export const editVendor = async (req, res, next) => {
//     const { id } = req.params;
//     const {
//         name, address, phoneNumber, email, identityProof, category,
//         description, experience, duration, fees, serviceType, serviceImages
//     } = req.body;

//     // Validate required fields
//     const requiredFields = [
//         { field: 'name', value: name },
//         { field: 'phoneNumber', value: phoneNumber },
//         { field: 'email', value: email },
//         { field: 'identityProof', value: identityProof },
//         { field: 'category', value: category },
//         { field: 'description', value: description },
//         { field: 'experience', value: experience },
//         { field: 'duration', value: duration },
//         { field: 'fees', value: fees },
//         { field: 'serviceImages', value: serviceImages }
//     ];

//     const validationError = validateRequiredFields(requiredFields);
//     if (validationError) {
//         return next(CustomErrorHandler.badRequest(validationError));
//     }

//     // Validate email format
//     if (!validateEmail(email)) {
//         return next(CustomErrorHandler.badRequest('Invalid email format'));
//     }

//     // Validate address for offline service
//     if (serviceType === 'offline' && (!address || address.trim() === '')) {
//         return next(CustomErrorHandler.badRequest('Address cannot be empty for offline service'));
//     }

//     // Validate phone number
//     if (!isValidPhoneNumber(phoneNumber)) {
//         return next(CustomErrorHandler.badRequest('Phone number must be a 10-digit number'));
//     }

//     // Validate fees
//     if (!isNumeric(fees)) {
//         return next(CustomErrorHandler.badRequest('Fees must be a number'));
//     }

//     try {
//         const vendorData = {
//             name,
//             address,
//             phoneNumber,
//             email,
//             identityProof,
//             category,
//             description,
//             experience,
//             duration,
//             fees,
//             serviceType,
//             serviceImages,
//         };

//         const updatedVendor = await VendorService.updateVendor(id, vendorData);
//         return res.status(200).json({
//             status: true,
//             message: "Vendor updated successfully",
//             data: {
//                 vendor: {
//                     ...updatedVendor.toObject()
//                 }
//             }
//         });
//     } catch (error) {
//         return next(error);
//     }
// };

// Edit Vendor
export const editVendor = async (req, res, next) => {
    const { id } = req.params;
    const {
        name, address, phoneNumber, email, identityProof, category,
        description, experience, duration, fees, serviceType, serviceImages
    } = req.body;

    // Validate required fields
    const requiredFields = [
        { field: 'name', value: name },
        { field: 'phoneNumber', value: phoneNumber },
        { field: 'email', value: email },
        { field: 'identityProof', value: identityProof },
        { field: 'category', value: category },
        { field: 'description', value: description },
        { field: 'experience', value: experience },
        { field: 'duration', value: duration },
        { field: 'fees', value: fees },
        { field: 'serviceImages', value: serviceImages }
    ];

    const validationError = validateRequiredFields(requiredFields);
    if (validationError) {
        return next(CustomErrorHandler.badRequest(validationError));
    }

    // Validate email format
    if (!validateEmail(email)) {
        return next(CustomErrorHandler.badRequest('Invalid email format'));
    }

    // Validate address for offline service
    if (serviceType === 'offline' && (!address || address.trim() === '')) {
        return next(CustomErrorHandler.badRequest('Address cannot be empty for offline service'));
    }

    try {
        const vendorData = {
            name,
            address,
            phoneNumber,
            email,
            identityProof,
            category,
            description,
            experience,
            duration,
            fees,
            serviceType,
            serviceImages
        };

        const updatedVendor = await VendorService.updateVendor(id, vendorData);
        return res.status(200).json({
            status: true,
            message: "Vendor updated successfully",
            data: {
                vendor: {
                    ...updatedVendor.toObject()
                }
            }
        });
    } catch (error) {
        return next(error);
    }
};

// Delete Vendor
export const deleteVendor = async (req, res, next) => {
  const { id } = req.params;

  try {
      const deletedVendor = await VendorService.deleteVendorById(id); // Call the correct method name
      return res.status(200).json({ message: 'Vendor marked as deleted successfully' });
  } catch (error) {
      return next(error);
  }
};

// Export all functions at once
export default {
    createVendor,
    getAllVendors,
    getVendorById,
    editVendor,
    deleteVendor
};
