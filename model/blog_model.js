import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { type: String, required: true},
  description: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // This refers to the User model
  },
  likes: {
    type: Number,
    default: 0 // Default value for price
  },
  // comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;