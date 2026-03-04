import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './src/config/db.js';
import User from './src/models/UserModel.js';

dotenv.config();

const createAdmin = async () => {
    await connectDB();
    const email = 'admin@rentora.com';
    const password = await bcrypt.hash('admin123', 10);

    await User.findOneAndDelete({ email });

    const user = await User.create({
        username: 'AdminMaster',
        email,
        password,
        role: 'admin'
    });
    console.log('Admin user created:', user.email);
    process.exit(0);
};

createAdmin();
