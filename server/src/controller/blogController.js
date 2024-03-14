import Blog from "../models/blogModels.js";
import User from "../models/userModels.js";
import cloudinary from "cloudinary";

export const createBlogBooking = async (req, res, next) => {
  try {
    const mainImageResult = await cloudinary.uploader.upload(
      req.files.mainImage[0].path
    );
    const imagesResults = await Promise.all(
      req.files.images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "otherImages",
        });
        return result.secure_url;
      })
    );
    const newBlogBooking = new Blog({
      ...req.body,
      images: imagesResults,
      mainImage: mainImageResult.secure_url,
    });
    await newBlogBooking.save();

    const user = await User.findById(req.body.user);
    user.blogs.push(newBlogBooking._id);
    await user.save();

    res.status(200).json(newBlogBooking);
  } catch (err) {
    next(err);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const getBlogsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.findById(id).populate("user");
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  const { comment } = req.body;
  const userId = req.body.userId;
  console.log(comment);
  console.log(userId);
  try {
    const postComment = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reviews: { text: comment, user: userId } },
      },
      { new: true }
    );
    if (!postComment) {
      throw new Error("Updated document not found");
    }
    const post = await Hotel.findById(postComment._id).populate(
      "reviews.user",
      "username"
    );

    res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    next(err);
  }
};


export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).json(deletedBlog);
  } catch (err) {
    next(err);
  }
};