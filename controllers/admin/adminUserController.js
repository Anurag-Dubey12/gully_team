import Joi from "joi";
import { userServices } from "../../services/index.js";
import firebaseNotification from "../../helpers/firebaseNotification.js";


const adminUserController = {

  async getAllUser(req, res, next) {

    const page = parseInt(req.params.page) || 1;    // Get the requested page from query parameters (default to page 1)
    const pageSize = parseInt(req.params.pageSize); // Set the number of documents per page

    const search = req.query.search || "";


    // Calculate the number of documents to skip based on the requested page
    const skip = (page - 1) * pageSize;

    try {
      const result = await userServices.getAllUser(pageSize,skip,search);

      return res.status(200).json({
        sucess: true,
        status: true,
        message: "User data Retrived SucessFully",
        data: result.data,
        count: result.count,
      });
    } catch (err) {
      console.log(" Error in getContent ");
      return next(err);
    }
  },

  async editUserStatus(req, res, next) {
    let userId = req.params.userId;
    //validation

    // console.log(req.body);

    try {
      const result = await userServices.editUserStatus(userId,req.body);

      const notificationData = {
        title: "Gully Team",
        body: `Your account is ${result.banStatus}.`,
        image: "",
      };

      if (result.fcmToken) {
        await firebaseNotification.sendNotification(result.fcmToken, notificationData);
      }

      return res.status(200).json({
        sucess: true,
        status: true,
        message: "UserAction Edited SucessFully",
        data: result,
      });
    } catch (err) {
      console.log(" Error in editUserStatus ");
      return next(err);
    }
  },

  async getAllSubAdmin(req, res, next) {

    const page = parseInt(req.params.page) || 1;    // Get the requested page from query parameters (default to page 1)
    const pageSize = parseInt(req.params.pageSize); // Set the number of documents per page

    // Calculate the number of documents to skip based on the requested page
    const skip = (page - 1) * pageSize;

    try {
      const result = await userServices.getAllSubAdmin(pageSize,skip);

      return res.status(200).json({
        sucess: true,
        status: true,
        message: "User data Retrived SucessFully",
        data: result.data,
        count: result.count,
      });
    } catch (err) {
      console.log(" Error in getContent ");
      return next(err);
    }
  },

  async getSubAdminById(req, res, next) {

    const userId = req.params.userId;

    try {
      const result = await userServices.getSubAdminById(userId);

      return res.status(200).json({
        sucess: true,
        status: true,
        message: "User data Retrived SucessFully",
        data: result,
      });
    } catch (err) {
      console.log(" Error in getContent ");
      return next(err);
    }
  },

  async addSubAdmin(req, res, next) {
    //validation
    const SubAdminSchema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().pattern(/^\d{10}$/), // Assuming 10-digit phone number
      password: Joi.string().min(6).required(),
      role: Joi.string().valid('subAdmin').required(), // Adjust the valid roles as needed
      rights: Joi.array().items(Joi.string().valid('Users', 'Organizer', 'Addsports', 'Fess&offer', 'Notification', 'ContentManager', 'Helpdesk', 'subAdmin', 'Reporting')), // Adjust the allowed rights as needed
    });

    const { error } = SubAdminSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    try {

      const result = await userServices.addSubAdmin(req.body);

      return res.status(200).json({
        sucess: true,
        status: true,
        message: "SubAdmin created suessfully",
        data: result,
      });
    } catch (err) {
      console.log("Error in addSubAdmin");
      return next(err);
    }
  },

  async editSubAdmin(req, res, next) {

    const userId = req.params.userId;
    //validation
    const SubAdminSchema = Joi.object({
      _id:Joi.required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.optional(), // Assuming 10-digit phone number
      role: Joi.string().valid('subAdmin').required(), // Adjust the valid roles as needed
      rights: Joi.array().items(Joi.string().valid('Users', 'Organizer', 'Addsports', 'Fess&offer', 'Notification', 'ContentManager', 'Helpdesk', 'subAdmin', 'Reporting')), // Adjust the allowed rights as needed
    });

    const { error } = SubAdminSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    try {

      const result = await userServices.editSubAdmin(userId,req.body);

      return res.status(200).json({
        sucess: true,
        status: true,
        message: "SubAdmin edited suessfully",
        data: result,
      });
    } catch (err) {
      console.log("Error in editSubAdmin");
      return next(err);
    }
  },

  

 



}

export default adminUserController;