const userService = require("../Services/userServices")


// Creating the User Data
const createuser = async (req, res) => {
  try {
    const userdata = await userService.createUserData(req.body);
    res.status(201).json(userdata);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login the User
const loginUser = async (req, res) => {
  try {
    const user = await userService.loginUserData(req.body);
    res.send(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await userService.loginUserService(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await userService.verifyOTPService(email, otp);
    res.status(200).json(result); // If this hits, frontend redirects to Reset Password page
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await userService.resetPasswordService(email, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



module.exports = {
  createuser,
  loginUser,
  // login,
  // verifyLogin
  sendOTP,
  verifyOTP,
  resetPassword


}