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
    });

    return res
      .status(201)
      .json({message:"News created successfully", newNews});
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
    category,
    shortDescription,
    sharingNumber,
    thumbnailImage, // Add thumbnailImage to the destructuring assignment
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
      !category
    ) {
      throw new ApiError(
        400,
        "title, content, isHighlighted, isPublished, short description, and category are required"
      );
    }

    const findNews = await News.findById(id);

    if (!findNews) {
      throw new ApiError(404, "News not found");
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
    findNews.thumbnailImage = thumbnailImage; // Assign thumbnailImage
    findNews.category = category;

    await findNews.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "News updated successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete news
export const deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new ApiError(400, "News ID is required");
    }

    const findNews = await News.findById(id);

    if (!findNews) {
      throw new ApiError(404, "News not found");
    }

    if (
      req.role !== "admin" &&
      findNews.owner.toString() !== req.user.toString()
    ) {
      throw new ApiError(403, "Not authorized to delete this news");
    }

    await News.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, "News post deleted"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



