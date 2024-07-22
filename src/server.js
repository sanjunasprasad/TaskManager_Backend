import express from 'express';
import connectDB from './config/mongo.js';
import dotenv from "dotenv"
import cors from 'cors';
import userRoute from './interfaces/routes/userRoutes.js';


const app = express();
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
connectDB();

// const allowedOrigins = ['http://localhost:3000'];
 const allowedOrigins = ['https://task-manager-pink-six.vercel.app']
app.use(
  cors({
    origin: allowedOrigins, 
    methods: 'GET, PUT, POST, DELETE, PATCH',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true 
  })
);


//routes
app.use('/', userRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));