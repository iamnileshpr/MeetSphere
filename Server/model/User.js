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
    },
    password: {
        type: String,
        required: [true, 'please provide a name'],
        minlength: [6, 'Password must contain 6 characters'],
        select: false //password will not ben seen by user
    }
}, {
    timestamps: true
})

//hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) { //to check password is modified or not before login
        return next();
    }

    const salt = await bcryptjs.genSalt(12)
    this.password = await bcryptjs.hash(this.password, salt)
    next();
})

userSchema.method.matchPassword = async function(enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)