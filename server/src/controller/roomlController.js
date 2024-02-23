import Room from "../models/roomModels.js";
import Hotel from "../models/hotelModels.js";
import User from "../models/userModels.js";
import { createError } from "../utils/error.js";
import cloudinary from "cloudinary";


// export const createRoom = async (req, res, next) => {
//   const hotelId = req.params.hotelid;
//   const newRoom = new Room(req.body);

//   try {
//     const savedRoom = await newRoom.save();
//     try {
//       await Hotel.findByIdAndUpdate(hotelId, {
//         $push: { rooms: savedRoom._id },
//       });
//     } catch (err) {
//       next(err);
//     }
//     res.status(200).json(savedRoom);
//   } catch (err) {
//     next(err);
//   }
// };

export const createRoom = async (req, res) => {
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
    const room = new Room({...req.body ,
      images: imagesResults,
      mainImage: mainImageResult.secure_url,
    });
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteRooms = async (req, res) => {
  try {
    const roomId = req.params.id; 
    
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await Room.findByIdAndDelete(roomId);

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





// export const updateRoom = async (req, res, next) => {
//   try {
//     let imagesResults = [];
//     if (req.files && req.files.images) {
//       imagesResults = await Promise.all(
//         req.files.images.map(async (file) => {
//           const result = await cloudinary.uploader.upload(file.path, {
//             folder: "otherImages",
//           });
//           return result.secure_url;
//         })
//       );
//     }

//     let mainImageResult;
//     if (req.files && req.files.mainImage && req.files.mainImage[0]) {
//       mainImageResult = await cloudinary.uploader.upload(
//         req.files.mainImage[0].path
//       );
//     }

//     const updateData = {
//       ...req.body,
//     };

//     if (imagesResults.length > 0) {
//       updateData.images = imagesResults;
//     }

//     if (mainImageResult) {
//       updateData.mainImage = mainImageResult.secure_url;
//     }

//     const updatedRoom = await Room.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateData },
//       { new: true }
//     );
//     res.status(200).json(updatedRoom);
//   } catch (err) {
//     next(err);
//   }
// };


// export const updateRoomAvailability = async (req, res, next) => {
//   try {
//     await Room.updateOne(
//       { "roomNumbers._id": req.params.id },
//       {
//         $push: {
//           "roomNumbers.$.unavailableDates": req.body.dates,
//         },
//       }
//     );
//     res.status(200).json("Room status has been updated.");
//   } catch (err) {
//     next(err);
//   bele kod yazmisam ba
//   }
// };


export const updateRoom = async (req, res, next) => {
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

    const updateRoom = await Room.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.unavailableDates.push(...req.body.dates);
    await user.save();

    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

// export const getRoomById = async (req, res, next) => {
//   try {
//     const room = await Room.findById(req.params.id);
//     res.status(200).json(room);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getAllRooms = async (req, res, next) => {
//   try {
//     const rooms = await Room.find();
//     res.status(200).json(rooms);
//   } catch (err) {
//     next(err);
//   }
// };


export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Oda bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
