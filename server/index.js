import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import Stripe from "stripe";
import { AuthRouter } from "./src/routes/authRoutes.js";
import { HotelRouter } from "./src/routes/hotelsRoutes.js";
import { UserRouter } from "./src/routes/userRouter.js";
import { RoomRouter } from "./src/routes/roomsRoutes.js";
import { HotelTypeRouter } from "./src/routes/hotelTypeRoutes.js";
import { DestinationSliderRouter } from "./src/routes/destinationSliderRoutes.js";
import { BookingRouter } from "./src/routes/bookingRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const stripe = new Stripe(process.env.SECRET_KEY);

const PORT = process.env.PORT;
const URL = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose
  .connect(URL)
  .then(() => console.log("DB CONNECT"))
  .catch((err) => console.log("DB NOT CONNECT" + err));

app.post("/payment", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});

app.use("/api", AuthRouter);
app.use("/api", UserRouter);
app.use("/api", HotelRouter);
app.use("/api", HotelTypeRouter);
app.use("/api", RoomRouter);
app.use("/api", DestinationSliderRouter);
app.use("/api", BookingRouter);

console.log("Cloudinary Config:", cloudinary.config());
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);

app.use(
  "./src/uploads",
  express.static(
    `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`
  )
);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`SERVER Connection on PORT ${PORT}`);
});
