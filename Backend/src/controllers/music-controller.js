const spotifyService = require("../services/spotify.service");
const statusCodes = require("../constants/statusCodes");

class MusicController {
  async getTopArtists(req, res) {
    try {
      const artists = await spotifyService.getTopArtists();
      res.status(statusCodes.OK).json(artists);
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error fetching top artists",
        message: error.message,
      });
    }
  }

  async getTopTracks(req, res) {
    try {
      const tracks = await spotifyService.getTopTracks();
      console.log();
      res.status(statusCodes.OK).json(tracks);
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error fetching top tracks",
        message: error.message,
      });
    }
  }

  async searchTracks(req, res) {
    const { query } = req.query;
    try {
      const tracks = await spotifyService.searchTracks(query);
      res.status(statusCodes.OK).json(tracks);
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error searching tracks",
        message: error.message,
      });
    }
  }
}

module.exports = new MusicController();
