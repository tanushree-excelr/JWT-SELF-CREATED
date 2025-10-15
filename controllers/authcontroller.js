const { registerService, loginService, verifyTokenService } = require("../services/authService");

// Register user
const registerUser = async (req, res) => {
  try {
    const { newUser, accessToken } = await registerService(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken,
      data: newUser,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { user, accessToken } = await loginService(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      data: user,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// Verify token
const verifyTokenController = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = verifyTokenService(token);
    res.status(200).json({ success: true, message: "Token is valid", data: decoded });
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};

module.exports = { registerUser, loginUser, verifyTokenController };
