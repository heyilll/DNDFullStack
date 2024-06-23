import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    roles: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const User = mongoose.model(`User`, userSchema);

export default User;