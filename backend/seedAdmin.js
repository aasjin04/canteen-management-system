const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/canteen");

const createAdmin = async () => {
  const exists = await User.findOne({ email: "admin@canteen.com" });

  if (!exists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@canteen.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
  } else {
    console.log("Admin already exists");
  }

  mongoose.disconnect();
};

createAdmin();