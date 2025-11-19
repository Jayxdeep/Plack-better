import mongoose from "mongoose"

export const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("mongodb connected");
    } catch(err){
        console.error(err);
        process.exit(1);
    }
};