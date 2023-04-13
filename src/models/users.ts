import mongoose from "mongoose";
// create schema Users
const userSchema = new mongoose.Schema({})

const urlModel = mongoose.model("urls", userSchema);

export default urlModel;