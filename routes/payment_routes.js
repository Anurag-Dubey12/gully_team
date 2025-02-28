import express from "express";
const router = express.Router();
import { otherController } from "../controllers/index.js";
import validateUser from "../middlewares/validateUser.js";

router.post("/createOrder", validateUser, otherController.createOrder);
router.post("/createBannerOrder", validateUser, otherController.createBannerOrder);
router.post("/createSponsorOrder", validateUser, otherController.createSponsorOrder);
router.put("/updatePayment", otherController.updatePayment);
router.post("/applyCoupon", validateUser, otherController.applyCoupon);
// router.post("/tournamentFees", validateUser, otherController.tournamentFees);
router.post("/tournamentFees/:tournamentLimit", validateUser, otherController.tournamentFees);
router.get("/getCoupon", validateUser, otherController.getCoupon);
router.get("/transactionHistory",validateUser,otherController.transactionHistory);
router.get("/transactionHistoryById",validateUser,otherController.transactionHistory);
// router.get("/allTransactions",validateUser,otherController.allTransactions)
router.delete("/transactions",validateUser,otherController.deleteTransaction);
router.delete("/transactions/:transactionId",validateUser,otherController.deleteTransactionById);
export default router;