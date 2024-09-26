const LastFM = require("lastfm-node-client");

const lastfm = new LastFM(
  process.env.LASTFM_API_KEY,
  process.env.LASTFM_API_SECRET
);

module.exports = lastfm;
