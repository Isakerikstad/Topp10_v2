// Defines the routes (endpoints) for user-related operations, such as retrieving all users.

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

module.exports = router;
