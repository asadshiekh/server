import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  author: String,
  description: String,
  // comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;