import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";

import { tokenGenrerator } from "../utils/token-generator.util.js";
import { emailValidator, passwordValidator } from "../utils/validator.util.js";

//create user
export const createUser = async (req, res) => {
  const { fullName, avatar, email, password, role } = req.body;

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
      return res.status(400).json({ message: "User already in the database" });
    }

    const saltPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      avatar,
      email,
      password: saltPassword,
      role,
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
  const { email, fullName, avatar } = req.body;

  try {
    if ((!email || !fullName, !avatar)) {
      return res
        .status(500)
        .json({ message: "email, fullname, avatar is required" });
    }

    if (!emailValidator(email)) {
      return res.status(500).json({ message: "Email is invalid" });
    }

    const findUser = await User.findById(req.user);

    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    (findUser.fullName = fullName),
      (findUser.email = email),
      (findUser.avatar = avatar);

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
  const { oldPassword, newPassword } = req.body;

  try {
    const userId = req.user;

    const findUser = await User.findById(userId);

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
