import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

// Get all videos
router.get('/all', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get videos by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const videos = await Video.find({ category });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search videos
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single video
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Video.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
