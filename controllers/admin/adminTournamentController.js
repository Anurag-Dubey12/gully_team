
import { tournamentServices } from "../../services/index.js";


const adminTournamentController = {
  
    async getAllTournament(req, res, next) {

    
        const page = parseInt(req.params.page) || 1;    // Get the requested page from query parameters (default to page 1)
        const pageSize = parseInt(req.params.pageSize); // Set the number of documents per page
    
        // Calculate the number of documents to skip based on the requested page
        const skip = (page - 1) * pageSize;

        const search = req.query.search || "";
    
        try {
          const result = await tournamentServices.getAllTournament(pageSize,skip,search);
    
          return res.status(200).json({
            sucess: true,
            status: true,
            message: "Organizer data Retrived SucessFully",
            data: result.data,
            count: result.count,
          });
        } catch (err) {
          console.log(" Error in getAllOrganizer ");
          return next(err);
        }
      },

      async getAllTournamentLive(req, res, next) {
        const page = parseInt(req.params.page) || 1;    // Get the requested page from query parameters (default to page 1)
        const pageSize = parseInt(req.params.pageSize); // Set the number of documents per page
    
        // Calculate the number of documents to skip based on the requested page
        const skip = (page - 1) * pageSize;
    
        try {
          const result = await tournamentServices.getAllTournamentLive(pageSize,skip);
    
          return res.status(200).json({
            sucess: true,
            status: true,
            message: "Organizer data Retrived SucessFully",
            data: result.data,
            count: result.count,
          });
        } catch (err) {
          console.log(" Error in getAllOrganizer ");
          return next(err);
        }
      },

      async getTournamentById(req, res, next) {
        const Id = req.params.Id;
        try {
          const result = await tournamentServices.getTournamentById(Id);
    
          return res.status(200).json({
            sucess: true,
            status: true,
            message: "Organizer data Retrived SucessFully",
            data: result,
          });
        } catch (err) {
          console.log(" Error in getATournamentById ");
          return next(err);
        }
      },

      async getMatchesByTournamentId(req, res, next) {
        const TournamentId = req.params.TournamentId;
        try {
          const result = await tournamentServices.getMatchesByTournamentId(TournamentId);
    
          return res.status(200).json({
            sucess: true,
            status: true,
            message: "Matches data Retrived SucessFully",
            data: result,
          });
        } catch (err) {
          console.log(" Error in getMatchesByTournamentId ");
          return next(err);
        }
      },

      async updateTournamentById(req, res, next) {
        const Id = req.params.Id;
        try {
          const result = await tournamentServices.updateTournamentById(Id,req.body);

          return res.status(200).json({
            sucess: true,
            status: true,
            message: "Organizer data Edited SucessFully",
            data: result,
          });
        } catch (err) {
          console.log(" Error in updateTournamentById ");
          return next(err);
        }
      },
      async getMatchesHistoryByTournamentId(req, res, next) {
        const TournamentId = req.params.TournamentId;
        try {
          const result = await tournamentServices.getMatchesHistoryByTournamentId(TournamentId);
    
          return res.status(200).json({
            sucess: true,
            status: true,
            message: "Matches data Retrived SucessFully",
            data: result,
          });
        } catch (err) {
          console.log(" Error in getMatchesHistoryByTournamentId ");
          return next(err);
        }
      },

      

};

export default adminTournamentController;