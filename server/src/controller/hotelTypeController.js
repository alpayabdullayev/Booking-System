import HotelType from "../models/hotelTypeModels.js";
import cloudinary from 'cloudinary'


export const createHotelType = async (req, res) => {
    try {
        const { name } = req.body;

        const result = await cloudinary.uploader.upload(req.file.path);

        const newHotelType = new HotelType({
            name: name,
            image: result.secure_url,
        });

        await newHotelType.save();

        res.status(200).json(newHotelType);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




export const getAllHotelTypes = async (req, res) => {
    try {
      const HotelTypes = await HotelType.find({})
      res.status(200).json(HotelTypes)
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }