/**
 * Friend Controller
 * Handles friend request and friend operations
 */

const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');
const Notification = require('../models/Notification');

// Send friend request
const sendFriendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;

    if (recipientId === req.userId) {
      return res.status(400).json({ message: 'Cannot send friend request to yourself' });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already friends
    const user = await User.findById(req.userId);
    if (user.following.includes(recipientId)) {
      return res.status(400).json({ message: 'Already friends with this user' });
    }

    // Check if request already exists
    const existingRequest = await FriendRequest.findOne({
      sender: req.userId,
      receiver: recipientId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    const friendRequest = new FriendRequest({
      sender: req.userId,
      receiver: recipientId,
    });

    await friendRequest.save();

    // Create notification
    await Notification.create({
      user: recipientId,
      actor: req.userId,
      type: 'friend_request',
    });

    res.status(201).json({
      success: true,
      message: 'Friend request sent successfully',
      friendRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get friend requests
const getFriendRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      receiver: req.userId,
      status: 'pending',
    })
      .populate('sender', 'firstName lastName avatar email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept friend request
const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (friendRequest.receiver.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to accept this request' });
    }

    const sender = await User.findById(friendRequest.sender);
    const receiver = await User.findById(friendRequest.receiver);

    // Add to followers and following
    sender.following.push(receiver._id);
    receiver.followers.push(sender._id);
    receiver.following.push(sender._id);
    sender.followers.push(receiver._id);

    await sender.save();
    await receiver.save();

    friendRequest.status = 'accepted';
    await friendRequest.save();

    res.status(200).json({
      success: true,
      message: 'Friend request accepted',
      friendRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject friend request
const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (friendRequest.receiver.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to reject this request' });
    }

    friendRequest.status = 'rejected';
    await friendRequest.save();

    res.status(200).json({
      success: true,
      message: 'Friend request rejected',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove friend
const removeFriend = async (req, res) => {
  try {
    const { friendId } = req.body;

    const user = await User.findById(req.userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.following = user.following.filter((id) => id.toString() !== friendId);
    user.followers = user.followers.filter((id) => id.toString() !== friendId);
    friend.following = friend.following.filter((id) => id.toString() !== req.userId);
    friend.followers = friend.followers.filter((id) => id.toString() !== req.userId);

    await user.save();
    await friend.save();

    res.status(200).json({
      success: true,
      message: 'Friend removed successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
};
