const mongoose = require("mongoose");

const connectDb = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add it to backend/.env");
  }

  const conn = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`MongoDB connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  return conn;
};

module.exports = connectDb;
