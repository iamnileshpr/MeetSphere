import mongoose from "mongoose";

const connectDb = async() => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
        console.log("Mongoose connection establish", conn.connection.host);
    } catch (error) {
        console.error('error connecting to database', error.message);
        process.exit(1);
    }

}

export default connectDb