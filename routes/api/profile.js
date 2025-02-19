const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');


// @route 	GET api/profile/test
// @desc	Tests profile route
// @access	Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));


// @route 	GET api/profile
// @desc	Get Current users profile
// @access	Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) =>{
	const errors = {};
	
	Profile
		.findOne({ user: req.user.id })
		.then(profile => {
			if(!profile){
				errors.noprofile = 'No Profile Found';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});


// @route 	POST api/profile
// @desc	Create or Update User profile
// @access	Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) =>{
	// Get Fields
	const profileFields = {};
	profileFields.user = req.user.id;
	if(req.body.handle)
		profileFields.handle = req.body.handle;
	
	if(req.body.company)
		profileFields.company = req.body.company;
	
	if(req.body.website)
		profileFields.website = req.body.website;
	
	if(req.body.location)
		profileFields.location = req.body.location;
	
	if(req.body.bio)
		profileFields.bio = req.body.bio;
	
	if(req.body.status)
		profileFields.status = req.body.status;
	
	if(req.body.githubusername)
		profileFields.githubusername = req.body.githubusername;
	
	// Skills
	if(typeof req.body.skills !== 'undefined'){
		profileFields.skills = req.body.skills.split(',');
	}
	
	// Social
	profileFields.social = {};
	if(req.body.youtube)
		profileFields.youtube = req.body.youtube;
	
	if(req.body.twitter)
		profileFields.twitter = req.body.twitter;
	
	if(req.body.linkedin)
		profileFields.linkedin = req.body.linkedin;
	
	if(req.body.instagram)
		profileFields.instagram = req.body.instagram;
	
	if(req.body.facebook)
		profileFields.facebook = req.body.facebook;
	
	
	Profile
		.findOne( { user: req.user.id })
		.then(profile => {
		if(profile){
			// Need to Update
			Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			).then(profile => res.join(profile));
		} else {
			// Create a new Profile
			
			// 1. Check if handle exists
			Profile
				.findOne({ handle: profileFields.handle })
				.then(profile => {
					if(profile){
						errors.handle = 'Handle already exists !';
						res.status(400).json(errors);
					}
				
				// 2. Save Profile
				new Profile(profileFields)
					.save()
					.then(profile => res.json(profile));
			});
		}
	});	
	
});


module.exports = router;