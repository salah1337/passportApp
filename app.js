const express = require('express');
const passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

const app = express();

const GITHUB = {
    clientID: "36a18e40e8880bd823af",
    clientSecret: "19d59d87a2bbed367007adcb962eb9eccbf7ac5d"
};

passport.use(new GitHubStrategy({
    clientID: GITHUB.clientID,
    clientSecret: GITHUB.clientSecret,
    callbackURL: "https://passport1337.herokuapp.com/auth/github/callback",
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
app.get('/', (req, res)=>{
    res.send('<a href="/auth/github">go</a>')
})
app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})