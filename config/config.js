import mongoose from "mongoose";

const connectDB =async ()=>{
    try{

        await mongoose.connect(process.env.MONGO_DB_URI)

    }
    catch(error){
        console.log(error.message);
        throw error
    }
}

export default connectDB;
