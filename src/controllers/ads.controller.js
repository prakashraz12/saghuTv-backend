import { Ads } from "../models/ads.model.js";

// Create a new ad
export const createAd = async (req, res) => {
  try {
    const newAd = await Ads.create(req.body);
    return res.status(201).json(newAd);
  } catch (error) {
    return res.status(500).json({ error: "Error creating ad" });
  }
};

// Get all ads
export const getAllAds = async (req, res) => {
  try {
    const ads = await Ads.find();
    return res.status(200).json(ads);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching ads" });
  }
};

// Update an ad by ID
export const updateAd = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAd = await Ads.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAd) {
      return res.status(404).json({ error: "Ad not found" });
    }
    return res.status(200).json(updatedAd);
  } catch (error) {
    return res.status(500).json({ error: "Error updating ad" });
  }
};

// Delete an ad by ID
export const deleteAd = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAd = await Ads.findByIdAndRemove(id);
    if (!deletedAd) {
      return res.status(404).json({ error: "Ad not found" });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Error deleting ad" });
  }
};

//getAdsByposition;
export const getAdsByPosition = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);
    const ads = await Ads.findOne({
      position: q,
    });
    if (!ads) {
      return res.status(404).json({ message: "ads not found" });
    }

    res.status(200).json({ message: "ads fetched successfully", ads });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting ad" });
  }
};
