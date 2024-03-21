const express = require('express');
const permissionController = require('./permission');
const userController = require('./user');
const roleController = require('./role');

const router = express.Router();

router.use('/permission', permissionController);
router.use('/user', userController);
router.use('/role', roleController);

module.exports = router;
