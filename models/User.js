const { ObjectID } = require('bson');
const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,      
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmail = (email) => {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
        },
        message: "Please enter a valid email."
    },
    },
    thoughts: [{
      type: Schema.Types.ObjectID,
      ref: 'Thought'
    //reference to Thought model
    }],
    friends: [{
      type: Schema.Types.ObjectID,
      ref: 'User'
     //reference to user model (self)
    }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;