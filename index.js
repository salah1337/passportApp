const express = require('express');
const passport = require('passport')
var TwitchtvStrategy = require('passport-twitchtv').Strategy;

const app = express();

const TWITCHTV = {
    clientID: "3bim2h9k5ht5jfyktqpuqiasdexg27",
    clientSecret: "bz4tt9sztacz4sd8qx8rg8imqbsjjn"
};

passport.use(new TwitchtvStrategy({
    clientID: TWITCHTV.clientID,
    clientSecret: TWITCHTV.clientSecret,
    callbackURL: "http://127.0.0.1:3000/auth/twitchtv/callback",
    scope: "user_read"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ twitchtvId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
app.get('/auth/twitchtv', passport.authenticate('twitchtv'));

app.get('/auth/twitchtv/callback', 
  passport.authenticate('twitchtv', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.listen(3000, ()=>{
    console.log('listening on 3000')
})