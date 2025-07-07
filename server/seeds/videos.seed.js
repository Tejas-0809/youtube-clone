import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "../models/Video.js";
import User from "../models/User.js";

dotenv.config();

const uri = process.env.MONGO_URI;

async function seedVideos() {
  try {
    await mongoose.connect(uri);
    const users = await User.find({});
    
    if (users.length === 0) {
      throw new Error("No users found. Please run users.seed.js first.");
    }

    const sampleVideos = Array.from({ length: 50 }).map((_, i) => ({
      userId: users[i % users.length]._id,
      title: `Sample Video ${i + 1}`,
      desc: `This is the description for sample video ${i + 1}.`,
      imgUrl: "https://i.ytimg.com/vi/ysz5S6PUM-U/hqdefault.jpg",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      views: Math.floor(Math.random() * 1000),
      tags: ["sample", "test", "demo"],
      likes: [],
      dislikes: [],
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24)
    }));

    await Video.deleteMany({});
    await Video.insertMany(sampleVideos);
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}

seedVideos();