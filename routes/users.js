const express = require('express');
const passport= require('passport');

const router= express.Router();

const userController = require('../controllers/user_controller');


router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.get('/profile',passport.checkAuthentication,userController.profile);

router.post('/create',userController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}, 
),userController.createSession);

router.get('/sign-out',userController.destroySession);

module.exports = router;