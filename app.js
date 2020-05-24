const express = require('express');
const passport = require('passport')
const mongoose = require('mongoose')

var User = require('./models/User')

require('./config/db')


// const FacebookStrategy = require("passport-facebook").Strategy;
// const AmazonStrategy = require("passport-amazon").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const InstagramStrategy = require("passport-instagram").Strategy;
// const SpotifyStrategy = require("passport-spotify").Strategy;
const TwitchStrategy = require("@d-fischer/passport-twitch").Strategy;
const keys = require("./config/keys");

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

const app = express();
app.use(passport.initialize());

app.get('/', (req, res)=>{
    res.render('home.ejs')
  })
  app.get('/login', (req, res)=>{
    res.send('<a href="/auth/github">go</a>')
})

app.get('/auth/github',passport.authenticate('github'));
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(req.user);
  });

app.get('/auth/twitch',passport.authenticate('twitch'));
app.get('/auth/twitch/callback', 
  passport.authenticate('twitch', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("d");
    
    // Successful authentication, redirect home.
    res.send(req.user);
  });





const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})