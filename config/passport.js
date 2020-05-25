const passport = require('passport')
var User = require('../models/User')


// const FacebookStrategy = require("passport-facebook").Strategy;
// const AmazonStrategy = require("passport-amazon").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const InstagramStrategy = require("passport-instagram").Strategy;
// const SpotifyStrategy = require("passport-spotify").Strategy;
const TwitchStrategy = require("@d-fischer/passport-twitch").Strategy;
const keys = require("./credentials/keys");

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Github Strat
passport.use(new GitHubStrategy({
    clientID: keys.GITHUB.clientID,
    clientSecret: keys.GITHUB.clientSecret,
    callbackURL: "/auth/github/callback",
  },
  async function(accessToken, refreshToken, profile, cb) {
    let user;
    await new User({ githubId: profile.id }).save().then((err, user) => {
      user = user
    })
    return cb(null, profile);
  }
));

// Twitch Strat
passport.use(new TwitchStrategy({
  clientID: keys.TWITCH.clientID,
  clientSecret: keys.TWITCH.clientSecret,
  callbackURL: "/auth/twitch/callback",
},
async function(accessToken, refreshToken, profile, cb) {
  let user;
  await new User({ twitchId: profile.id }).save().then((err, user) => {
    user = user
  })
  return cb(null, profile);
}
));

// Google Strat
passport.use(new GoogleStrategy({
  clientID: keys.GOOGLE.clientID,
  clientSecret: keys.GOOGLE.clientSecret,
  callbackURL: "/auth/google/callback",
},
async function(accessToken, refreshToken, profile, cb) {
  let user;
  await new User({ googleId: profile.id }).save().then((err, user) => {
    user = user
  })
  return cb(null, profile);
}
));

module.exports = passport;