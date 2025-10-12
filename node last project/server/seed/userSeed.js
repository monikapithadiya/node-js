const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/User');

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
      console.log('Admin already exists');
      process.exit();
    }

    const hashed = await bcrypt.hash('Admin@123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashed,
      role: 'admin'
    });

    console.log('Admin created successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding:', err);
    process.exit(1);
  }
})();
