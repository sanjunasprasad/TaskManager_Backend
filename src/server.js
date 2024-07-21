import express from 'express';
import connectDB from './config/mongo.js';
import dotenv from "dotenv"
import cors from 'cors';
import userRoute from './interfaces/routes/userRoutes.js';




const app = express();
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());
connectDB();












//routes
app.use('/', userRoute);






const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));