const express = require ("express")
const router = express.Router()

const userController = require("../Controller/userController")

// Adding User
router.post("/adduser",userController.createuser)

// Login User
router.post("/loginUser", userController.loginUser)

// Step 1: Request OTP
router.post("/forgot-password", userController.sendOTP);

// Step 2: Verify OTP (UI redirects to Reset Page if this returns 200)
router.post("/verify-otp", userController.verifyOTP);

// Step 3: Update Password in DB
router.post("/reset-password", userController.resetPassword);


module.exports = router