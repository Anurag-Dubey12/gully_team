import Joi from "joi";
import { authServices } from "../../services/index.js";

const registerController = {
  async googleLogin(req, res, next) {
    const coordinatesSchema = Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      placeName: Joi.string().required(),
    });

    //validation
    const registerSchema = Joi.object({
      fullName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().optional(), // Adjust min and max values based on your requirements
      coordinates: coordinatesSchema.required(),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const result = await authServices.googleLogin(req.body);

      return res.status(200).json({
        sucess: true,
        message: "profile created suessfully",
        data: { user: result },
      });
    } catch (err) {
      console.log("Error in createProfile");
      return next(err);
    }
  },
};

export default registerController;
