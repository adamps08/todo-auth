const express = require("express");
const passportGoogle = require("passport");
const router = express.Router();

// Description: Authenticate with Google
// Route: GET /auth/google
router.get(
  "/google",
  passportGoogle.authenticate("google", { scope: ["profile"] })
);

// Description: Google auth callback
// Route: GET /auth/google/callback
router.get(
  "/google/callback",
  passportGoogle.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("Authentication should have been successfull");
    res.redirect("/signup");
  }
);

// Description: Logout user
// Route: GET /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  console.log("User has been logged out.");
  res.redirect("/");
});

module.exports = router;
