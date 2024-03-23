import { SiteSettings } from "../models/site-settings.model.js";

export const createSiteSettings = async (req, res) => {
  try {
    const newSettings = await SiteSettings.create(req.body);
    res.status(201).json({success:true});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const siteSettingsUpdate = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedSettings = await SiteSettings.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedSettings) {
      return res.status(404).json({ error: "Site settings not found" });
    }
    res.status(200).json({success:true});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSiteSettingsById = async (req, res) => {
  try {
    const { id } = req.params;
    const findSiteSettings = await SiteSettings.findById(id);
    if (!findSiteSettings) {
      return res.status(500).json({ message: "site settings not found" });
    }

    res.status(200).json(findSiteSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSiteSeetings = async (req, res) => {
  try {
    const siteSettings = await SiteSettings.find().sort({ createdAt: -1 });

    if (!siteSettings || siteSettings.length === 0) {
      return res.status(404).json({ success: false, message: "Site settings not found" });
    }

    // Send the first index of siteSettings directly
    const settings = siteSettings[0];
    res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error("Error fetching site settings:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


