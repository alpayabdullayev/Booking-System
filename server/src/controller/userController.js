import User from "../models/userModels.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { username, password, role, email } = req.body;

    const rounds = 10;
    const hashedPassword = await bcrypt.hash(password, rounds);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      email,
    });

    await newUser.save();
    res.status(200).json({ message: "Created User", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err.message);
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate({
        path: "wishlist.hotel",
      })
      .populate({
        path: "bookings",
        populate: [{ path: "room" }, { path: "hotel" }, { path: "user" }],
      });
    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("wishlist.hotel");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { hotelId } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const hotelExistInWishlist = user.wishlist.find(
      (x) => x.hotel && x.hotel._id.toString() === hotelId
    );

    if (hotelExistInWishlist) {
      user.wishlist = user.wishlist.filter(
        (x) => x.hotel && x.hotel._id.toString() !== hotelId
      );
    } else {
      user.wishlist.push({ hotel: hotelId });
    }

    await user.save();
    const data = await user.populate("wishlist.hotel");
    res.status(201).json({
      message: "Wishlist updated",
      user: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
