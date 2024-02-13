import User from "../models/userModels.js";
import bcrypt from 'bcrypt';



export const createUser = async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json(newUser);
    } catch (err) {
      next(err);
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
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {

    console.error('Error updating user:', err.message);
    next(err);
  }
};
export const deleteUser = async (req,res,next)=>{
  try {
    const {id} = req.params
    await User.findByIdAndDelete(id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUserById = async (req,res,next)=>{
  try {
    const {id} = req.params
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getAllUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}