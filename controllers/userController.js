const {User} = require('../models');

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //get one user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID exists'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
   //update a user
   updateUser(req, res) {
        User.findOneAndUpdate()
   },
    // Delete a user
    deleteUser(req, res) {
    }
}