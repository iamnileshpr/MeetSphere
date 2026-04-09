import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv'
import connectDb from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
dotenv.config();

const PORT = process.env.PORT;

const corsOption = {
    origin: process.env.CLIENT_URL,
    credential: true
}

connectDb()

app.use(cors(corsOption)) //allow backend to access data of frontend
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/health", function(req, res) {
    res.json({
        status: "ok",
        message: "Live class sever is running",
        timeStamp: new Date().toISOString()
    })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on this port ${PORT} `);
})