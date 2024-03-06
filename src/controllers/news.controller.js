import { News } from "../models/news-post.model.js";

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
    });

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
    thumbnailImage,
  } = req.body;
  const { id } = req.params;

  try {
    if (
      !title ||
      !content ||
      !id ||
      !isHighlighted ||
      !isPublished ||
      !shortDescription ||
      !categories
    ) {
      return res
        .status(400)
        .json({
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
    findNews.thumbnailImage = thumbnailImage;
    findNews.categories = categories;
    findNews.sharingNumber = sharingNumber;
    findNews.isHighlighted = isHighlighted;

    await findNews.save();

    return res.status(200).json({ message: "News updated successfully" });
  } catch (error) {
    console.log(error)
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
        .json({ message: "You are not authorised person to delete this news" });
    }

    await News.findByIdAndDelete(id);

    return res.status(200).json({ message: "News post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNews = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const news = await News.find()
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
      totalPages: Math.ceil((await News.countDocuments()) / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
