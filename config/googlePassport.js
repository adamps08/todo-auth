const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const gUser = require("../models/GoogleUser");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);// Uncomment to see the data that google provides

        // Get data from google signup
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        // Check if user already exists
        try {
          let user = await gUser.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
            // If not create user in db
          } else {
            user = await gUser.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    console.log("Serializing user with ID:", user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("Deserializing user with ID:", id);
    gUser.findById(id, (err, user) => done(err, user));
  });
};
