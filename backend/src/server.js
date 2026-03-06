import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

dotenv.config();
connectDB();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 3000;


const allowedOrigins = [
  "http://localhost:5173",
  // process.env.FRONTEND_URL || "https://mern-stack-project-ev3b.vercel.app"
];


app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", apiLimiter);


app.get("/", (req, res) => res.send("API Working"));
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);


app.use((req, res, next) => {
  res.status(404);
  next(new Error("Route not found"));
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});