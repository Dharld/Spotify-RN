require("dotenv").config();

const axios = require("axios");
const qs = require("querystring");

class SpotifyService {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.baseUrl = "https://api.spotify.com/v1";
    this.tokenUrl = "https://accounts.spotify.com/api/token";
    this.accessToken = null;
    this.tokenExpirationTime = null;
  }

  /**
   * Retrieves an access token for Spotify API authentication.
   * This method checks if a valid token exists, and if not, requests a new one.
   * @returns {Promise<string>} The access token.
   */
  async getAccessToken() {
    // Check for the expiration date
    if (this.accessToken && this.tokenExpirationTime > Date.now()) {
      return this.accessToken;
    }
    
    // Request options
    const options = {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(this.clientId + ":" + this.clientSecret).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    } 
    
    // Make a request to spotify backend to get token
    const response = await axios.post(
      this.tokenUrl,
      qs.stringify({ grant_type: "client_credentials" }),
      options
    );

    this.accessToken = response.data.access_token;
    this.tokenExpirationTime = Date.now() + response.data.expires_in * 1000;

    return this.accessToken;
    
  }


  /**
   * Retrieves an access token and makes a request to the Spotify API.
   * @param {string} endpoint - The API endpoint to request.
   * @param {Object} params - Query parameters for the request.
   * @returns {Promise<Object>} The response data from the API.
   */
  async makeRequest(endpoint, params = {}) {
    const token = await this.getAccessToken();

    const url = `${this.baseUrl}${endpoint}`;

    // Make the request for the endpoint
    const response = await axios.get(url, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }

  /**
   * Retrieves the top tracks from Spotify.
   * @param {number} limit - The number of tracks to retrieve (default: 10).
   * @returns {Promise<Array>} An array of top tracks.
   */
  async getTopTracks(limit = 10) {
    // Spotify doesn't have a direct "top tracks" endpoint, so we'll use a popular playlist
    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
    
    const url = `/playlists/${playlistId}/tracks`;

    // Make the request
    const data = await this.makeRequest(url, {
      limit,
    });

    // Return the data in a specific form
    return data.items.map((item) => ({
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      image: item.track.album.images[0].url,
      previewUrl: item.track.preview_url,
    }));
  }

  /**
   * Retrieves the top artists from Spotify.
   * @param {number} limit - The number of artists to retrieve (default: 10).
   * @returns {Promise<Array>} An array of top artists.
   */
  async getTopArtists(limit = 10) {
    // We'll use the same playlist to get top artists
    const tracks = await this.getTopTracks(50);

    // Count the tracks of the artist
    const artistCount = {};
    tracks.forEach((track) => {
      if (artistCount[track.artist]) {
        artistCount[track.artist]++;
      } else {
        artistCount[track.artist] = 1;
      }
    });

    return Object.entries(artistCount)
      // Sort in decreasing order
      .sort((a, b) => b[1] - a[1])

      // Take the limit greatest count
      .slice(0, limit)

      // Return the name and count
      .map(([name, count]) => ({ name, count }));
  }

  
  /**
   * Searches for tracks on Spotify based on a query.
   * @param {string} query - The search query.
   * @param {number} limit - The maximum number of tracks to return (default: 10).
   * @returns {Promise<Array>} An array of track objects matching the search query.
   */
  async searchTracks(query, limit = 10) {
    // Make a request to the Spotify search endpoint
    const data = await this.makeRequest("/search", {
      q: query,
      type: "track",
      limit,
    });

    // Map the returned tracks to a simplified format
    return data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[0].url,
      previewUrl: track.preview_url,
    }));
  }
}

module.exports = new SpotifyService();
