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
//  const allowedOrigins = ['https://task-manager-pink-six.vercel.app/']
// app.use(
//   cors({
//     origin: allowedOrigins, 
//     methods: 'GET, PUT, POST, DELETE, PATCH',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     credentials: true 
//   })
// );
const allowedOrigins = ['https://task-manager-pink-six.vercel.app'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200,
  credentials: false,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

//routes
app.use('/', userRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));