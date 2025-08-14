const SH = require('../models/Sh')

const getSH = async (req, res) => {
  try {
    const SHs = await SH.find()
      .populate('user', 'username profileImage')
      .populate('likes', 'username profileImage')
      .populate('comments.user', 'username profileImage');

    res.json(SHs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createSH = async (req, res) => {
  try {
    const { sh } = req.body;
    const userId = req.user?.id || req.user?._id || req.user?.sub;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }

    if (!sh) {
      return res.status(400).json({ message: "SH content is required" });
    }

    const newSH = new SH({ user: userId, sh });
    await newSH.save();

    res.status(201).json({ message: 'SH posted', post: newSH });
  } catch (error) {
    res.status(500).json({ message: 'Error creating SH', error: error.message });
  }
};


const likeSH = async (req, res) => {
  try {
    const userId = req.user.sub; 
    const { shId } = req.body;

    const post = await SH.findById(shId);
    if (!post) return res.status(404).json({ message: 'SH not found' });

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post.' });
    }

    post.likes.push(userId);
    await post.save();

    res.json({ message: 'Liked', likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error liking SH', error: error.message });
  }
};


const comments = async (req, res) => {
  try {
    const userId = req.user.sub; 
    const { shId, text } = req.body;

    const post = await SH.findById(shId);
    if (!post) return res.status(404).json({ message: 'SH not found' });

    post.comments.push({ user: userId, text });
    await post.save();

    res.json({ message: 'Comment added', comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};


module.exports = {
  getSH,
  createSH,
  likeSH,
  comments
}