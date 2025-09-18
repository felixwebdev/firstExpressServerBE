import mongoose from "mongoose";

export const connectDB = async () => {
    const GODB_URI = 'mongodb+srv://TranKhanhBE:Myduyenn95%25@cluster0.hzjzvm5.mongodb.net';

    try {
    await mongoose.connect(GODB_URI);
    console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}