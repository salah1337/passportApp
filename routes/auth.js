const express = require('express');
const router = express.Router()
const passport = require('passport')

var User = require('../models/User')

// GITHUB
router.get('/github',passport.authenticate('github'));
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    User.findOne({ githubId: req.user.id })
    .then(user => {
        if (!user) {
            console.log('no user')
            new User({ 
                name: req.user.username,
                githubId: req.user.id,
                imageURL: req.user.photos[0].value,
                origin: req.user.provider,
                profileURL: req.user.profileURL
            }).save().then(user => {
                return res.redirect('/' + user._id)
            })
        } else{
            console.log('yes user')
            return res.redirect('/' + user._id)
        }
    })
  });

// TWITCH
router.get('/twitch',passport.authenticate('twitch'));
router.get('/twitch/callback', 
  passport.authenticate('twitch', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    User.findOne({ twitchId: req.user.id })
    .then(user => {
        if (!user) {
            console.log('no user')
            new User({ 
                name: req.user.display_name,
                twitchId: req.user.id,
                imageURL: req.user.profile_image_url,
                origin: req.user.provider,
            }).save().then(user => {
                return res.redirect('/' + user._id)
            })
        } else{
            console.log('yes user')
            return res.redirect('/' + user._id)
        }
    })
  });

// GOOGLE
router.get('/google',passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    User.findOne({ googleId: req.user.id })
    .then(user => {
        if (!user) {
            console.log('no user')
            new User({ 
                name: req.user.displayName,
                googleId: req.user.id,
                imageURL: req.user.photos[0].value,
                origin: req.user.provider,
            }).save().then(user => {
                return res.redirect('/' + user._id)
            })
        } else{
            console.log('yes user')
            return res.redirect('/' + user._id)
        }
    })
  });


// SPOTIFY
router.get('/spotify',passport.authenticate('spotify'));
router.get('/spotify/callback', 
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    User.findOne({ spotifyId: req.user.id })
    .then(user => {
        if (!user) {
            console.log('no user')
            new User({ 
                name: req.user.displayName,
                spotifyId: req.user.id,
                imageURL: req.user.photos[0],
                origin: req.user.provider,
            }).save().then(user => {
                return res.redirect('/' + user._id)
            })
        } else{
            console.log('yes user')
            return res.redirect('/' + user._id)
        }
    })
  });

module.exports = router