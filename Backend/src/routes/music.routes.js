const express = require("express");
const router = express.Router();
const MusicController = require("../controllers/music-controller");

const {
  verifyFirebaseIdToken,
} = require("../middleware/firebase-auth.middleware");

// Top Artists
router.get(
  "/top-artists",
  verifyFirebaseIdToken,
  MusicController.getTopArtists
);

// Top Tracks
router.get("/top-tracks", verifyFirebaseIdToken, MusicController.getTopTracks);

// Search Tracks
router.get("/search", verifyFirebaseIdToken, MusicController.searchTracks);

module.exports = router;
