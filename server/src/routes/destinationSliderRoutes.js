import express from "express"
import { createDestinationSlider, getAllDestinationSliders, getDestinationSliderById } from "../controller/destinationSliderController.js"
import upload from "../middleware/upload.js";

export const DestinationSliderRouter = express.Router()

DestinationSliderRouter.post("/destination",upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]),createDestinationSlider)
DestinationSliderRouter.get("/destination",getAllDestinationSliders)
DestinationSliderRouter.get("/destination/:id",getDestinationSliderById)