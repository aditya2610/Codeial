const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
// const userController = require('../controllers/user_controller');

router.get('/',homeController.home);
router.get('/stock_chat',homeController.stockChat);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/chatbox',require('./chatbox'));

router.use('/api',require('./api'));

module.exports = router;