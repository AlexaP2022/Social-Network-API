const {Thought} = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // get a single thought by _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought)=>
            !thought
            ? res.status(404).json({ message: "No thought with that ID exists"})
            : res.json(thought)
        ) 
        .catch((err) => res.status(500).json(err));     
    },
    // Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.json(500).json(err);
            });
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate()
    },
    // Delete a thought
    deleteThought(req,res) {
        
    }
}