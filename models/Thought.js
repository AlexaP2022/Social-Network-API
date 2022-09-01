const { ObjectID } = require('bson');
const { Schema, Types, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => moment(date).format("MMM DD, YYYY, [at] hh:mm a")
        }
    },
    {
        toJSON: {
            getters: true,

        },
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => moment(date).format("MMM DD, YYYY, [at] hh:mm a")

        },
        reactions: [reactionSchema]

    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})
const Thought = model('thought', thoughtSchema);

module.exports = Thought;