import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  full_name: String,
  phone : String,
  email: String,
  password:String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;