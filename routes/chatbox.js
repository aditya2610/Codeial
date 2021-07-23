const express = require('express');
const passport= require('passport');

const router = express.Router();

const chatController=require('../controllers/chat_controller');


router.get('/:room',passport.checkAuthentication,chatController.chat);
router.get('/delete/:id',chatController.destroy);


module.exports = router;