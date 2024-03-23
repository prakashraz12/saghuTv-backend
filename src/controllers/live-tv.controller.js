import { LiveTv } from "../models/live-tv.model.js";

export const createLiveTv = async (req, res) => {
  try {
    const { liveTvTitle, liveTvVideoLink, isLive, description } = req.body;
    const newLiveTv = await LiveTv.create({
      liveTvTitle,
      liveTvVideoLink,
      isLive,
      description,
    });

    res.status(201).json(newLiveTv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLiveTv = async (req, res) => {
  try {
    const { liveTvTitle, liveTvVideoLink, isLive, description, id } = req.body;
    const updatedLiveTv = await LiveTv.findByIdAndUpdate(
      id,
      { liveTvTitle, liveTvVideoLink, isLive, description },
      { new: true }
    );
    if (!updatedLiveTv) {
      return res.status(404).json({ message: "LiveTv not found" });
    }
    res.status(200).json(updatedLiveTv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLiveTvById = async (req, res) => {
  try {
    const liveTv = await LiveTv.findById(req.params.id);
    if (!liveTv) {
      return res.status(404).json({ message: "LiveTv not found" });
    }
    res.status(200).json(liveTv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLiveTv = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const liveTvs = await LiveTv.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(liveTvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLiveTv = async (req, res) => {
  try {
    const { id } = req.params;
    await LiveTv.findOneAndDelete(id);
    res.status(200).json({ message: "Live tv deleted" });
  } catch (error) {}
};

export const liveTv = async (req, res) => {
  try {
    const findLiveTv = await LiveTv.find({ isLive: true }).sort({
      createdAt:-1
    });
    if (!findLiveTv?.length === 0) {
      return res.status(404).json({ message: "Livetv not found" });
    }
    console.log(findLiveTv)
    res.status(200).json(findLiveTv[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
