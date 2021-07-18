const express = require('express');
const passport= require('passport');

const router= express.Router();

const userController = require('../controllers/user_controller');
const resetController = require('../controllers/reset_controller');


router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.post('/create',userController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}, 
),userController.createSession);

router.get('/sign-out',userController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate(
    'google', 
    {failureRedirect:'/users/sign-in'}) , userController.createSession);


router.get('/forgot-password', userController.forgot_email_page);
router.post('/reset',resetController.sendResetMail);
router.get('/reset_password_page/:id',resetController.reset_password_page);
router.post('/change_password/:id',resetController.change_password);

module.exports = router;