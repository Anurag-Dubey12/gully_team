import express from "express";
const router = express.Router();
import { adminController, otherController,adminOtherController } from "../controllers/index.js";
import validateUser from "../middlewares/validateUser.js";

router.post("/addhelpDesk", validateUser, otherController.addhelpDesk);
router.get("/getBanner", validateUser, otherController.getBanner);

//here we need to pass contentName in query parameter.
//this api  to  get terms, faq, privacy and policies and other.
router.get("/update", adminController.getupdate);
router.get("/getContent/:contentName",otherController.getContent);

//Get package for particular section
router.get('/packages/type/:packageFor',validateUser ,otherController.getPackagesByType);
// Route to get a single package by ID
router.get('/packages/getPackageby/:id',validateUser ,otherController.getPackageById);

export default router;
