import mongoose from 'mongoose'
import 'dotenv/config'

const mongoUrl = process.env.MONGO_URI

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI);

export const db = mongoose.connection;

