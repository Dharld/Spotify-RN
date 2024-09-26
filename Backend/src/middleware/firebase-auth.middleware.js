const { admin } = require("../config/firebase");
const statusCodes = require("../constants/statusCodes");

const verifyFirebaseIdToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(statusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    return res.status(statusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("Error verifying token", err);
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ error: "Invalid token" });
  }
};

module.exports = { verifyFirebaseIdToken };
