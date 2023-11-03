module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // console.log("Content of req.user");
      // console.log(req.user);
      // console.log("User has been authenticated.");
      // console.log("Content of req.isAuthenticated() below:");
      // console.log(req.isAuthenticated());
      return next();
    } else {
      // console.log("User has NOT been authenticated.");
      // console.log("Content of req.user");
      // console.log(req.user);
      // console.log("Content of req.isAuthenticated() below:");
      // console.log(req.isAuthenticated());
      // console.log("Content of req below:");
      // console.log(req);
      res.redirect("/");
    }
  },

  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      return next();
    }
  },
};
