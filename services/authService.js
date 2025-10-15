const User = require("../models/user");
const { hashPassword, comparePassword, generateToken, verifyToken } = require("../helpers/authHelper");

// Register service
const registerService = async (data) => {
  const { username, email, password, role } = data;

  if (!username || !email || !password) {
    throw new Error("Provide username, email, and password");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  await newUser.save();

  const accessToken = generateToken(newUser);

  return { newUser, accessToken };
};

// Login service
const loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken(user);

  return { user, accessToken };
};

// Verify token service
const verifyTokenService = (token) => {
  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (e) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { registerService, loginService, verifyTokenService };
