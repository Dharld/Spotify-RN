const spotifyService = require("../services/spotify.service");
const statusCodes = require("../constants/statusCodes");

class MusicController {
  
  /**
   * Fetches the top artists from Spotify.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  async getTopArtists(req, res) {
    try {
      // Get the top artists from the Spotify service
      const artists = await spotifyService.getTopArtists();

      // Send the artists as a JSON response with OK status
      res.status(statusCodes.OK).json(artists);
    } catch (error) {
      // Error handling
      console.error('Error in getTopArtists:', error);

      // Send an error response to the client
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error fetching top artists",
        message: error.message,
      });
    }
  }

  /**
   * Fetches the top tracks from Spotify.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  async getTopTracks(req, res) {
    try {
      // Get the top tracks from the Spotify service
      const tracks = await spotifyService.getTopTracks();

      // Send the tracks as a JSON response with OK status
      res.status(statusCodes.OK).json(tracks);
    } catch (error) {
      // Error handling
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error fetching top tracks",
        message: error.message,
      });
    }
  }

  /**
   * Searches for tracks on Spotify based on a query.
   * @param {Object} req - The request object containing the search query.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  async searchTracks(req, res) {
    const { query } = req.query;

    try {
      // Search for tracks using the Spotify service
      const tracks = await spotifyService.searchTracks(query);

      // Send the tracks as a JSON response with OK status
      res.status(statusCodes.OK).json(tracks);
    } catch (error) {
      // Error handling
      console.error('Error in searchTracks:', error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error searching tracks",
        message: error.message,
      });
    }
  }
}

module.exports = new MusicController();
