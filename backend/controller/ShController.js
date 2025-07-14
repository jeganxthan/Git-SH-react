const SH = require('../models/Sh')

const getSH = async (req, res) => {
  try {
    const SHs = await SH.find();
    res.json(SHs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
const createSH = async (req, res) => {
  try {
    const { userId, sh } = req.body;

    const newSH = new SH({ user: userId, sh });
    await newSH.save();

    res.status(201).json({ message: 'SH posted', post: newSH });
  } catch (error) {
    res.status(500).json({ message: 'Error creating SH', error: error.message });
  }
};

const likeSH = async (req, res) => {
  try {
    const { shId, userId } = req.body;

    const post = await SH.findById(shId);
    if (!post) return res.status(404).json({ message: 'SH not found' });

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.json({ message: 'Liked', likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error liking SH', error: error.message });
  }
};


const comments = async (req, res) => {
  try {
    const { shId, userId, text } = req.body;
    const post = await SH.findById(shId);
    if (!post) return res.status(404).json({ messgae: 'Sh not fount' });
    post.comments.push({ user: userId, text });
    await post.save();
    res.json({ message: 'Comment added', comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  getSH,
  createSH,
  likeSH,
  comments
}