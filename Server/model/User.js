import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
        maxlength: [50, 'name cannot be more then 50 character']
    },
    email: {
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
        unique: true, //input should unique
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'please rovide valid email']
    }
})