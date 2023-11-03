const express = require("express");
const passport = require("passport");
const router = express.Router();

// Description: Authenticate with Google
// Route: GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Description: Google auth callback
// Route: GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/todos");
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
