import { Category } from "../models/category.model.js";
import { News } from "../models/news-post.model.js";
import { User } from "../models/user.model.js";

export const adminDashBoard = async (req, res) => {
  try {
    const totalNewsLength = await News.countDocuments({ isPublished: true });
    const totalReporters = await User.countDocuments({ role: "editor" });
    const totalCategories = await Category.countDocuments({});
    const totalUnpublishedNews = await News.countDocuments({ isPublished: false });

    const trendingNews = await News.find()
      .sort({ views: -1, createdAt: -1 })
      .limit(10).populate({
        path:"owner",
        select:"fullName avatar"
      })
      .exec();

    const recentNews = await News.find()
      .sort({ createdAt: -1 })
      .limit(10).populate({
        path:"owner",
        select:"fullName avatar"
      })
      .exec();

    // Process or send the results as needed
    res.status(200).json({
      totalNewsLength,
      totalReporters,
      totalCategories,
      totalUnpublishedNews,
      trendingNews,
      recentNews,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
