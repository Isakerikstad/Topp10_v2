// Contains the logic for handling user-related requests, such as fetching all users from the database.

const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

module.exports = {
    getAllUsers
};
