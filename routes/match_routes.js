import express from "express";

const router = express.Router();

import { matchController } from "../controllers/index.js";
import validateUser from "../middlewares/validateUser.js";

router.post("/createMatch",validateUser, matchController.createMatch);
router.get("/getMatches/:tournamentId", matchController.getMatches);
router.get("/getMatch/:matchId", matchController.getSingleMatch);
// router.get("/editMatch/:matchId", matchController.editMatch);
router.put("/editMatch/:matchId", validateUser, matchController.editMatch); // Corrected to PUT
router.delete("/deleteMatch/:matchId", validateUser, matchController.deleteMatch); // Added Delete Match

router.get("/getOpponentTournamentId",validateUser, matchController.getOpponentTournamentId);

router.get("/getOpponent/:tournamentId/:teamId",validateUser,matchController.getOpponent,);

router.get("/getOpponentOld/:tournamentId/:teamId", validateUser,  matchController.getOpponentOld,);

router.post(  "/updateScoreBoard/:matchId",  validateUser,  matchController.updateScoreBoard,);

router.put(  "/updateTeamMatchsData/:matchId",  validateUser,  matchController.updateTeamMatchsData,);

router.get("/teamRanking/:ballType", validateUser, matchController.teamRanking);

router.get(  "/playerRanking/:ballType/:skill",  validateUser,  matchController.playerRanking,);

router.post("/topPerformers", validateUser, matchController.topPerformers);

//nikhil
// router.get(
//   "/myPerformance/:id/:category/:matchType",
//   validateUser,
//   matchController.myPerformance,
// );

//DG
router.post( "/myPerformance/:userId",  validateUser,  matchController.myPerformance,);

// to create challenge match
router.post(  "/createChallengeMatch",  validateUser,  matchController.createChallengeMatch,);

router.get(  "/getChallengeMatch",  validateUser,  matchController.getChallengeMatch,);

//to chnage the status of challenge match eg. pending, Accepted,Denied
router.post(  "/updateChallengeMatch/:matchId/:status",  validateUser,  matchController.updateChallengeMatch,);

// to update score board of challenge match
router.post(  "/updateChallengeScoreBoard/:matchId",  validateUser,  matchController.updateChallengeScoreBoard,);

router.get(  "/getChallengeMatchPerformance/:matchId",  validateUser,  matchController.getChallengeMatchPerformance,);

router.post("/finishChallengeMatch/:matchId",  validateUser,  matchController.finishChallengeMatch,);

export default router;
