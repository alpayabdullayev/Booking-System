import DestinationSlider from "../models/destinationSlider.js";
import cloudinary from "cloudinary";

export const createDestinationSlider = async (req, res) => {
  try {
    const imagesResults = await Promise.all(
      req.files.images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "otherImages",
        });
        return result.secure_url;
      })
    );
    const mainImageResult = await cloudinary.uploader.upload(
        req.files.mainImage[0].path
      );

    const newDestinationSlider = new DestinationSlider({
      images: imagesResults,
      mainImage: mainImageResult.secure_url,
    });

    await newDestinationSlider.save();

    res.status(201).json(newDestinationSlider);
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};


export const deleteDestinationSlider = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedDestinationSlider = await DestinationSlider.findByIdAndDelete(id);
      res.status(200).json(deletedDestinationSlider);
    } catch (err) {
      next(err);
    }
  };
  
  export const getDestinationSliderById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const destinationSlider = await DestinationSlider.findById(id)
      res.status(200).json(destinationSlider);
    } catch (err) {
      next(err);
    }
  };
  
  export const getAllDestinationSliders = async (req, res, next) => {
    try {
      const DestinationSliders = await DestinationSlider.find({})
      res.status(200).json(DestinationSliders);
    } catch (err) {
      next(err);
    }
  };