require("dotenv").config();

const axios = require("axios");
const qs = require("querystring");

console.log(process.env.SPOTIFY_CLIENT_ID);
console.log(process.env.SPOTIFY_CLIENT_SECRET);

class SpotifyService {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.baseUrl = "https://api.spotify.com/v1";
    this.tokenUrl = "https://accounts.spotify.com/api/token";
    this.accessToken = null;
    this.tokenExpirationTime = null;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpirationTime > Date.now()) {
      return this.accessToken;
    }

    const response = await axios.post(
      this.tokenUrl,
      qs.stringify({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(this.clientId + ":" + this.clientSecret).toString(
              "base64"
            ),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    this.accessToken = response.data.access_token;
    this.tokenExpirationTime = Date.now() + response.data.expires_in * 1000;
    return this.accessToken;
  }

  async makeRequest(endpoint, params = {}) {
    const token = await this.getAccessToken();
    const response = await axios.get(`${this.baseUrl}${endpoint}`, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async getTopTracks(limit = 10) {
    // Spotify doesn't have a direct "top tracks" endpoint, so we'll use a popular playlist
    const playlistId = "37i9dQZEVXbMDoHDwVN2tF"; // Global Top 50 playlist
    const data = await this.makeRequest(`/playlists/${playlistId}/tracks`, {
      limit,
    });
    return data.items.map((item) => ({
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      image: item.track.album.images[0].url,
      previewUrl: item.track.preview_url,
    }));
  }

  async getTopArtists(limit = 10) {
    // We'll use the same playlist to get top artists
    const tracks = await this.getTopTracks(50);
    const artistCount = {};
    tracks.forEach((track) => {
      if (artistCount[track.artist]) {
        artistCount[track.artist]++;
      } else {
        artistCount[track.artist] = 1;
      }
    });
    return Object.entries(artistCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));
  }

  async searchTracks(query, limit = 10) {
    const data = await this.makeRequest("/search", {
      q: query,
      type: "track",
      limit,
    });
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
