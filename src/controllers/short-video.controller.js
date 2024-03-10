import { ShortVideo } from "../models/short-video.model.js";
// Create a new short video
export const createShortVideo = async (req, res) => {
  try {
    const { shortVideoTitle, shortVideoLink } = req.body;
    const newShortVideo = new ShortVideo({ shortVideoTitle, shortVideoLink });
    const savedShortVideo = await newShortVideo.save();
    res.status(201).json({ message: "Short video created", savedShortVideo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all short videos
export const getAllShortVideos = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const shortVideos = await ShortVideo.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(shortVideos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a short video by ID
export const deleteShortVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedShortVideo = await ShortVideo.findByIdAndDelete(id);

    if (!deletedShortVideo) {
      return res.status(404).json({ error: "Short video not found" });
    }

    res.status(200).json({ message: "Short video deleted", deletedShortVideo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a short video by ID
export const getShortVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const shortVideo = await ShortVideo.findById(id);

    if (!shortVideo) {
      return res.status(404).json({ error: "Short video not found" });
    }

    res.status(200).json(shortVideo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a short video by ID
export const updateShortVideo = async (req, res) => {
  const { id } = req.params;
  const { shortVideoTitle, shortVideoLink } = req.body;

  try {
    const updatedShortVideo = await ShortVideo.findByIdAndUpdate(
      id,
      { shortVideoTitle, shortVideoLink },
      { new: true }
    );

    if (!updatedShortVideo) {
      return res.status(404).json({ error: "Short video not found" });
    }

    res.status(200).json({ message: "Short video updated", updatedShortVideo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
