import { News } from "../models/news-post.model.js";
import { User } from "../models/user.model.js";

const adminDashBoard = async (req, res) => {
  try {
    const TotoalNewslength = await News.countDocuments({});
    const totalReporters = await User.countDocuments({role:"editor"});

  } catch (error) {}
};
