import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.js';
import tourRouter from './routes/tour.js';
import dotenv from "dotenv";



const app = express();
dotenv.config();



//middleware
app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/users", userRouter); //http://localhost:5000/users/signup
app.use("/tour", tourRouter); 





const PORT = process.env.PORT || 5000; 

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${port}`);
        console.log("Mogodb is connected");
    })
}).catch((error) => console.log(`${error} did not connect`))


 