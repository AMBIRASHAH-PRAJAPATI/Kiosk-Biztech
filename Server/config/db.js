import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.error(`Error in MongoDB connection: ${error.message}`.bgRed.white);

    // Enable mongoose debugging for more insights
    mongoose.set("debug", true);

    // Optionally, exit process if MongoDB connection fails
    process.exit(1);
  }
};

export default connectDB;
