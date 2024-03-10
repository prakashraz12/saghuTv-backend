import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";

import { tokenGenrerator } from "../utils/token-generator.util.js";
import { emailValidator, passwordValidator } from "../utils/validator.util.js";
import { News } from "../models/news-post.model.js";

//create user
export const createUser = async (req, res) => {
  const { fullName, avatar, email, password, role, department, about } =
    req.body;

  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "fullname, email, password are required" });
    }

    if (!emailValidator(email)) {
      return res.status(500).json({ message: "Email must be valid format" });
    }

    if (!passwordValidator(password)) {
      return res.status(400).json({
        message:
          "Password must be 6 character long and number and a special character included.",
      });
    }
    // Check for an existing user
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User email already in the database" });
    }

    const saltPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      avatar,
      email,
      password: saltPassword,
      role,
      department: department,
      about: about,
    });

    return res
      .status(201)
      .json({ newUser, message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(500)
        .json({ message: "Email and password are required" });
    }

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(500).json({ message: "User not found!" });
    }

    const isPasswordMatched = await bcrypt.compare(password, findUser.password);

    if (!isPasswordMatched) {
      return res.status(500).json({ message: "Invalid user details" });
    }

    const token = await tokenGenrerator(findUser._id, findUser.role);

    const response = {
      token,
      fullName: findUser.fullName,
      email: findUser.email,
      avatar: findUser.avatar,
      id: findUser._id,
    };

    return res
      .status(200)
      .json({ response, message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update user details
export const updateUser = async (req, res) => {
  const { email, fullName, avatar, phone, department, about, role, id } =
    req.body;

  try {
    if (!email || !fullName) {
      return res
        .status(500)
        .json({ message: "email, fullname, avatar is required" });
    }

    if (!emailValidator(email)) {
      return res.status(500).json({ message: "Email is invalid" });
    }

    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    (findUser.fullName = fullName),
      (findUser.email = email),
      (findUser.avatar = avatar);
    findUser.about = about;
    findUser.phone = phone;
    (findUser.role = role), (findUser.department = department);

    findUser.save();

    return res
      .status(200)
      .json({ message: "User details update successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//change password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, id } = req.body;

  try {
    const userId = req.user;
    const role = req.role;

    if (role !== "admin" && findUser._id !== userId) {
      return res.status(403).json({ message: "You are not authorized person" });
    }

    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({ message: "User  not found" });
    }

    const compareOldPassword = await bcrypt.compare(
      oldPassword,
      findUser.password
    );

    if (!compareOldPassword) {
      return res.status(400).json({ message: "Old Password is incorrect" });
    }

    if (!passwordValidator(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be 6 char long and special charater and uppercase included",
      });
    }

    const saltedNewPassword = await bcrypt.hash(newPassword, 10);

    findUser.password = saltedNewPassword;

    findUser.save();

    return res.status(200).json({ message: "Password update successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user;

    const users = await User.find({ _id: { $ne: currentUserId } });
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Users list fetched", users });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  const id = req.user;

  try {
    const getUserProfile = await User.findById(id)
      .select("fullName avatar email phone department")
      .populate({
        path: "news",
        options: {
          sort: { createdAt: -1 },
        },
      });

    if (!getUserProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User data fetched", getUserProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "id is not provided" });
    }
    const user = await User.findById(id).select(
      "avatar fullName email phone about department role"
    );

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const role = req.role;

    if (role !== "admin") {
      return res.status(409).json({ message: "You are not authorized" });
    }

    // Find the user
    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Find and delete all posts created by the user
    await News.deleteMany({ owner: id });

    // Now, you can delete the user
    await findUser.deleteOne();

    return res
      .status(200)
      .json({ message: "User and associated posts deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
