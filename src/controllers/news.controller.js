import { News } from "../models/news-post.model.js";
import { User } from "../models/user.model.js";

// Create news
export const createNews = async (req, res) => {
  const {
    title,
    content,
    categories,
    shortDescription,
    isHighlighted,
    sharingNumber,
    isPublished,
    tags,
    bannerImage,
    menu,
    recommendedNews,
    isShowOnProvince,
    province,
  } = req.body;

  try {
    if (!title || !content || !categories || !shortDescription) {
      return res.status(400).json({
        message: "title, content, category, shortDescription are required",
      });
    }

    const userId = req.user;
    const newNews = await News.create({
      title,
      content,
      owner: userId,
      categories,
      shortDescription,
      isHighlighted,
      isPublished,
      sharingNumber,
      tags,
      bannerImage,
      menu,
      recommendedNews,
      isShowOnProvince,
      province,
    });

    // Update user's news array
    await User.findByIdAndUpdate(
      userId,
      { $push: { news: newNews._id } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "News created successfully", newNews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update news
export const updateNews = async (req, res) => {
  const {
    title,
    content,
    isHighlighted,
    isPublished,
    categories,
    shortDescription,
    sharingNumber,
    bannerImage,
    recommendedNews,
    tags,
    menu,
    province,
    isShowOnProvince
  } = req.body;
  const { id } = req.params;

  try {
    if (
      !title ||
      !content ||
      !id ||
      !isPublished ||
      !shortDescription ||
      !categories
    ) {
      return res.status(400).json({
        message:
          "title, content, isHighlighted, isPublished, short description, and category are required",
      });
    }

    const findNews = await News.findById(id);

    if (!findNews) {
      return res.status(404).json({ message: "News not found" });
    }

    if (
      req.role !== "admin" &&
      findNews.owner.toString() !== req.user.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this news" });
    }

    findNews.title = title;
    findNews.content = content;
    findNews.isPublished = isPublished;
    findNews.shortDescription = shortDescription;
    findNews.bannerImage = bannerImage;
    findNews.categories = categories;
    findNews.sharingNumber = sharingNumber;
    findNews.isHighlighted = isHighlighted;
    findNews.menu = menu;
    findNews.recommendedNews = recommendedNews;
    findNews.tags = tags;
    findNews.province = province;
    findNews.isShowOnProvince = isShowOnProvince

    await findNews.save();

    return res.status(200).json({ message: "News updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete news
export const deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "News id is required" });
    }

    const findNews = await News.findById(id);

    if (!findNews) {
      return res.status(404).json({ message: "News not found" });
    }

    if (
      req.role !== "admin" &&
      findNews.owner.toString() !== req.user.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this news" });
    }

    await News.findByIdAndDelete(id);

    return res.status(200).json({ message: "News post deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllNews = async (req, res) => {
  const { page, limit, search } = req.query;

  try {
    let query = {};

    if (search && search.length > 0) {
      query = { title: { $regex: search, $options: 'i' } };
    }

    const news = await News.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "owner",
        select: "fullName",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: news,
      page: page,
      totalPages: Math.ceil((await News.countDocuments(query)) / limit),
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


export const getProvinceNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalNews = await News.countDocuments({ isShowOnProvince: true });

    const news = await News.find({ isShowOnProvince: true })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    if (!news || news.length === 0) {
      return res.status(404).json({ message: "News not found" });
    }

    const pagination = {};
    if (endIndex < totalNews) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.status(200).json({ news, pagination });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};


export const getProvinceNewsByProvinceNumber = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default is 1
  const limit = parseInt(req.query.limit) || 10; // Number of items per page, default is 10
  const province = req.query.province;

  try {
    const count = await News.countDocuments({ isShowOnProvince: true });
    const totalPages = Math.ceil(count / limit);

    // Validate current page
    if (page < 1 || page > totalPages) {
      return res.status(400).json({ message: "Invalid page number" });
    }

    const skip = (page - 1) * limit; // Calculate number of documents to skip

    // Find news items based on pagination options
    const news = await News.find({ isShowOnProvince: true, province })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!news) {
      return res.status(500).json({ message: "news not found" });
    }
    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalItems: count,
      news: news,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
