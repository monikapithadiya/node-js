// seed-admin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import User from './models/user.js';

const run = async () => {
  await connectDB();
  const exists = await User.findOne({ username: 'admin' });
  if (exists) { console.log('Admin exists'); process.exit(0); }
  const admin = new User({ username: 'admin', password: 'admin123', role: 'admin' });
  await admin.save();
  console.log('Admin created: admin/admin123');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
