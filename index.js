import express from "express";
import "dotenv/config";
import connectDB from "./config/config.js";



const app=express();

app.use(express.json());

////connectDB

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});


if (process.env.NODE_ENV !== "production"){
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`server is running on port ${process.env.PORT }`);
    })
}

export default app;
