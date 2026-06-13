/**
 * Post Model
 * Defines the schema for post documents in MongoDB
 */

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must have an author'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      maxlength: [5000, 'Post cannot exceed 5000 characters'],
      trim: true,
    },
    images: [{
      type: String,
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        required: true,
        maxlength: [1000, 'Comment cannot exceed 1000 characters'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    visibility: {
      type: String,
      enum: ['public', 'friends', 'private'],
      default: 'friends',
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Populate author and comment users
postSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate('author', 'firstName lastName avatar');
  this.populate('comments.user', 'firstName lastName avatar');
  next();
});

module.exports = mongoose.model('Post', postSchema);
