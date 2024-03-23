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
    const deletedAd = await Ads.findByIdAndDelete(id);
    if (!deletedAd) {
      return res.status(404).json({ error: "Ad not found" });
    }
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
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

export const multipleAdsGet = async (req, res) => {
  try {
    const { positions } = req.body;
    const findAds = await Ads.find({ position: { $in: positions } }); // Using $in operator for handle aray of input

    if (findAds.length === 0) {
      return res.status(404).json({ message: "Ads not found" });
    }

    return res.status(200).json({ ads: findAds });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
