import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import adminRouters from "./routes/adminRouter.js";
import categoryRouters from "./routes/categoryRouter.js";
import productRouters from "./routes/productRouter.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

// Configure environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// cors
const corsOptions = {
  origin: "https://kiosk-biztech.vercel.app",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true, // Corrected property name
};

//cors
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRouters);
app.use("/api/category", categoryRouters);
app.use("/api/product", productRouters);

// app.use("/api/data", some dataroutes);

// Base route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Lappy",
  });
});

// for error handling express
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue
  );
});
