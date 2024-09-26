const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} = require("../config/firebase");
const statusCodes = require("../constants/statusCodes");
const { default: app } = require("../firebase");

const auth = getAuth(app);

class FirebaseAuthController {
  registerUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({
        email: "Email is required",
        password: "Password is required",
      });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            res.status(statusCodes.CREATED).json({
              message: "Verification email sent! User created successfully!",
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
              error: "Error sending email verification",
              code: error.code,
            });
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
          error: error.message || "An error occurred while registering user",
          code: error.code || "unknown_error",
        });
      });
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({
        email: "Email is required",
        password: "Password is required",
      });
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      // Only send necessary user information
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        emailVerified: userCredential.user.emailVerified,
      };

      res.status(statusCodes.OK).json({
        message: "User logged in successfully",
        idToken: idToken,
        user: userInfo,
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while logging in";
      res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: errorMessage });
    }
  }

  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res
          .status(statusCodes.OK)
          .json({ message: "User logged out successfully" });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(statusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      });
  }

  resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(res.UNPROCESSABLE_ENTITY).json({
        email: "Email is required",
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res
          .status(statusCodes.OK)
          .json({ message: "Password reset email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(statusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      });
  }

  resendVerificationEmail(req, res) {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        res
          .status(statusCodes.OK)
          .json({ message: "Verification email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(statusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      });
  }
}

module.exports = new FirebaseAuthController();
