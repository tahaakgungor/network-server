const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {

    console.log("Connectsing to MongoDB...", process.env.DB_USER, process.env.DB_PASSWORD);
    await mongoose.connect(`mongodb://tahaakgungor:36987412tT@mongodb:27017`), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
