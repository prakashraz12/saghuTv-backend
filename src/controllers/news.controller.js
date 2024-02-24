import { News } from "../models/news-post.model.js";


export const createNews = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    category,
    shortDescription,
    isHighlighted,
    isPublished,
  } = req.body;

  if (!title || !content || !category || !shortDescription) {
    throw new ApiError(
      400,
      "title, content, ownerId, category, shortDescription are required"
    );
  }

  const userId = req.user;
  const newNews = await News.create({
    title,
    content,
    owner: userId,
    category,
    shortDescription,
    isHighlighted,
    isPublished,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newNews, "News created successfully"));
});

// Update news
export const updateNews = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    isHighlighted,
    isPublished,
    category,
    shortDescription,
  } = req.body;
  const { id } = req.params;

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
      "title, content, isHighlighted, isPublished , isShort description and newsId are required"
    );
  }

  const findNews = await News.findById(id);

  if (!findNews) {
    throw new ApiError(404, "News not found");
  }

  if (req.role !== "admin" && findNews.owner !== req.user) {
    throw new ApiError(403, "Not authorised person to update this news");
  }

  (findNews.title = title),
    (findNews.content = content),
    (findNews.isPublished = isPublished),
    (findNews.shortDescription = shortDescription),
    (findNews.thumbnailImage = thumbnailImage),
    (findNews.category = category);

  findNews.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "News updated successfully"));
});

// Delete news
export const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if newsId is provided
  if (!id) {
    throw new ApiError(400, "newsId is required");
  }
  const findNews = await News.findById(id);

  if (!findNews) {
    throw new ApiError(404, "News not found");
  }
  if (req.role !== "admin" && req.user !== findNews.owner) {
    throw new ApiError(403, "You are not authorised to delete tis news");
  }

  await News.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200, "News post deleted"));
});
