import Hotel from "../models/hotelModels.js";
import Room from "../models/roomModels.js";
import HotelType from "../models/hotelTypeModels.js";
import cloudinary from "cloudinary";

export const createHotel = async (req, res, next) => {
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
    const newHotel = new Hotel({
      ...req.body,
      images: imagesResults,
      mainImage: mainImageResult.secure_url,
    });
    await newHotel.save();
    res.status(200).json(newHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    let imagesResults = [];
    if (req.files && req.files.images) {
      imagesResults = await Promise.all(
        req.files.images.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "otherImages",
          });
          return result.secure_url;
        })
      );
    }

    let mainImageResult;
    if (req.files && req.files.mainImage && req.files.mainImage[0]) {
      mainImageResult = await cloudinary.uploader.upload(
        req.files.mainImage[0].path
      );
    }

    const updateData = {
      ...req.body,
    };

    if (imagesResults.length > 0) {
      updateData.images = imagesResults;
    }

    if (mainImageResult) {
      updateData.mainImage = mainImageResult.secure_url;
    }

    const updateHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    res.status(200).json(deletedHotel);
  } catch (err) {
    next(err);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id)
      .populate("type")
      .populate("rooms")
      .populate("reviews");
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({}).populate("type").populate("rooms");
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// export const countByType = async (req, res, next) => {
//   try {
//     const hotelCount = await Hotel.countDocuments({ type: "hotel" });
//     const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
//     const resortCount = await Hotel.countDocuments({ type: "resort" });
//     const villaCount = await Hotel.countDocuments({ type: "villa" });
//     const cabinCount = await Hotel.countDocuments({ type: "cabin" });

//     res.status(200).json([
//       {
//         type: "hotel",
//         count: hotelCount,
//         image:
//           "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
//       },
//       {
//         type: "apartments",
//         count: apartmentCount,
//         image:
//           "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
//       },
//       {
//         type: "resorts",
//         count: resortCount,
//         image:
//           "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
//       },
//       {
//         type: "villas",
//         count: villaCount,
//         image:
//           "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
//       },
//       {
//         type: "cabins",
//         count: cabinCount,
//         image:
//           "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
//       },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };

// const getTypeName = async (typeId) => {
//   try {
//     const type = await HotelType.findById(typeId);
//     return type ? type.name : 'Unknown Type';
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// // Route handler: Type'lara göre otel sayılarını getirir
// export const countByType = async (req, res, next) => {
//   try {
//     const typeCounts = await Hotel.aggregate([
//       {
//         $group: {
//           _id: '$type',
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     const results = await Promise.all(typeCounts.map(async (typeCount) => {
//       const typeName = await getTypeName(typeCount._id);
//       return { name: typeName, count: typeCount.count };
//     }));

//     res.status(200).json(results);
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getHotelsByType = async (req, res) => {
  const { typeId } = req.params;

  try {
    const hotels = await Hotel.findByType(typeId);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, limit: queryLimit, ...others } = req.query;
  try {
    const limit = parseInt(queryLimit) || 10;
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    })
      .populate("type")
      .limit(limit);

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { hotelId, userId, rating, comment } = req.body;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    hotel.reviews.push({ user: userId, ratings: rating, comment: comment });

    if (rating > 5) {
      res.status(400).json({ message: "5den yuxari olmaz" });
    }
    await hotel.save();

    res.status(201).json({ message: "Comment added successfully", hotel });
  } catch (error) {
    next(error);
  }
};
