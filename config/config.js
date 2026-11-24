// import mongoose from "mongoose";

// const connectDB =async ()=>{
//     try{

//         // await mongoose.connect(process.env.MONGO_DB_URI)
        
//         console.log("MongoDB connected successfully!");

//     }
//     catch(error){
//         console.log(error.message);
//         throw error
//     }
// }

// export default connectDB;


// 2
// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             family: 4,
//             serverSelectionTimeoutMS: 30000
//         });
//         console.log("MongoDB connected successfully!");
//     } catch (error) {
//         console.log("DB Error:", error.message);
//         process.exit(1);
//     }
// };

// export default connectDB;


//////////3

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4,
            serverSelectionTimeoutMS: 30000
        });
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.log("DB Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;