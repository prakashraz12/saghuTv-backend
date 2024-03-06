import {
  MAX_HIGHLIGHTED_NEWS,
  MAX_RECENT_NEWS,
  MAX_TRENDING_NEWS,
} from "../constant.js";
import { Category } from "../models/category.model.js";
import { News } from "../models/news-post.model.js";

//get all news
export const getAllNews = async (req, res) => {
  let { page, limit } = req.query;

  try {
    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const newsList = await News.find({ isPublished: true })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
      .skip(skip)
      .limit(limit);

    if (newsList) {
      return res.status(404).json({ message: "No News" });
    }
    const totalNewsCount = await News.countDocuments();

    const totalPages = Math.ceil(totalNewsCount / limit);

    return res.status(200).json({
      newsList,
      pagination: {
        totalPages,
        currentPage: page,
        pageSize: limit,
      },

      message: "News retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get highlighted news
export const getHighlightedNews = async (req, res) => {
  try {
    const news = await News.find({ isPublished: true, isHighlighted: true })
      .sort({ createdAt: -1, updatedAt: -1 })
      .limit(MAX_HIGHLIGHTED_NEWS)
      .populate({
        path: "owner",
        select: "fullName avatar",
      });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    return res.status(200).json({ news, message: "Highlighted news fetched" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get trending news
export const getTrendingNews = async (req, res) => {
  try {
    const news = await News.find({ isPublished: "true" })
      .sort({ views: -1, createdAt: -1 })
      .limit(MAX_TRENDING_NEWS);

    if (!news) {
      return res.status(404).json({ message: "No any trending news" });
    }
    return res
      .status(200)
      .json(new ApiResponse(200, news, "Trending news fetched successfully"));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get recent news
export const getRecentNews = async (req, res) => {
  try {
    const news = await News.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(MAX_RECENT_NEWS);

    if (!news) {
      return res.status(400).json({ message: "No news found" });
    }

    return res
      .status(200)
      .json({ news, message: "Recent News Fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get news by id
export const getNewsById = async (req, res) => {
  const { id } = req.params;
  const incVlaue = 1;

  try {
    const news = await News.findByIdAndUpdate(
      { _id: id },
      { isPublished: true },
      { $inc: { views: incVlaue } }
    )
      .populate({
        path: "owner",
        select: "fullName avatar",
      })
      .populate({
        path: "recommendedNews",
        select: "title shortDescription bannerImage",
      });
      
    if (!news) {
      return res.status(404).json({ message: "News Not found" });
    }
  
    return res
      .status(200)
      .json({ news, message: "Successfully news fetched by id" });
  } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
  }
};

//news menus

//search news
export const searchNews = async (req, res) => {
  const { q } = req.query;

  try {
    if (!q) {
      return null;
    }

    const regex = new RegExp(q, "i");

    const news = await News.find({ isPublished: true, title: regex });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    return res.status(200).json({ message: "News fetched by title", news });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get news by category;
export const getNewsBycategory = async (req, res) => {
  try {
    const { cat } = req.query;

    if (!cat) {
      return null;
    }

    const news = await News.find({
      isPublished: true,
      categories: cat,
    }).limit(20);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    return res
      .status(200)
      .json({ news, message: "News fetched by category successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get news by menu
export const getNewsByMenu = async (req, res) => {
  try {
    let { me, limit, page } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    if (!me) {
      return null;
    }

    const news = await News.find({
      isPublished: true,
      menu: me,
    })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "owner",
        select: "fullName avatar",
      })
      .sort({ createdAt: -1 });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    return res
      .status(200)
      .json({ news, message: "News fetched by category successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
