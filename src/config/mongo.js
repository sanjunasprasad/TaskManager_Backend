import mongoose, { mongo } from 'mongoose';

const connectDB = async() =>{
    try{
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect("mongodb+srv://sanjuna:sanjuna@cluster0.oxtlxav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Database Connected');
    }catch(err){
        console.log(err);
    }
}

export default connectDB;

