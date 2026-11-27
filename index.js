import express from "express";
import "dotenv/config";
import connectDB from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())

// Auth Routes
app.use("/api/auth", authRoutes);

// Start Server after Database Connection
const startServer = async () => {
    try {
        await connectDB();

        console.log("MongoDB connected successfully!");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
};

startServer();

export default app;


// import express from "express";
// // import cors from "cors";
// import 'dotenv/config';
// import connectDb from "./config/config.js";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();

// /////////////// Middlewares
// app.use(express.json());
// // app.use(cors());

// ///////////// connect DB

// app.use(async(req,res,next)=>{
//     try {
//         await connectDb();
//         next()
//     } catch (error) {
//         next(error)
//     }
// });


// //////////// routes

// //   http://localhost:8000/api/auth/signup

// app.use('/api/auth', authRoutes);

// app.get('', (req, res) => {
//     res.send('Hurrryyyyyyyyyyyy!');
// })

// if (process.env.NODE_ENV !== 'production') {
//     app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}`))
// }


// export default app; /// for vercel deploy


// import express from "express";
// import 'dotenv/config';
// import connectDb from "./config/config.js";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();
// app.use(express.json());

// // connect db
// await connectDb();
// console.log("MongoDB connected successfully!");

// // Routes
// app.use('/api/auth', authRoutes);

// app.get('', (req, res) => {
//     res.send('Hurrryyyyyyyyyyyy!');
// })

// if (process.env.NODE_ENV !== 'production') {
//     app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}`))
// }

// export default app;


///////////////////////////////////////////////////

// import express from "express";
// import 'dotenv/config';
// import connectDB from "./config/config.js";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//     res.send('Hurrryyyyyyyyyyyy!');
// });

// //  connect Db
// const startServer = async () => {
//     try {
//         await connectDB();

//         const PORT = process.env.PORT || 5000;
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     } catch (error) {
//         console.log("Database connection failed:", error.message);
//     }
// };

// startServer();

// export default app; // for vercel deploy