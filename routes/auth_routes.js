import express from "express";

const router = express.Router();

import { registerController } from "../controllers/index.js";

router.post("/google_login", registerController.googleLogin);

export default router;
