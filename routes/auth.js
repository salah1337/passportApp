const express = require('express');
const router = express.Router()
const passport = require('passport')

// GITHUB
router.get('/github',passport.authenticate('github'));
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(req.user);
  });

// TWITCH
router.get('/twitch',passport.authenticate('twitch'));
router.get('/twitch/callback', 
  passport.authenticate('twitch', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(req.user);
  });

// GOOGLE
router.get('/google',passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(req.user);
  });

module.exports = router