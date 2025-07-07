import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

const uri = process.env.MONGO_URI; 

const sampleUsers = Array.from({ length: 10 }).map((_, i) => ({
  name: `User ${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  password: bcrypt.hashSync("password123", 10),
  img: `https://i.pravatar.cc/150?img=${i + 1}`,
  subscribers: 0,
  subscribedUsers: [],
  createdAt: new Date()
}));

async function seedUsers() {
  try {
    await mongoose.connect(uri);
    await User.deleteMany({});
    await User.insertMany(sampleUsers);
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}

seedUsers();