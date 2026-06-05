const userModel = require("../Model/userModel")
const credentialModel = require("../Model/credentialModel")
const { sendOTPEmail } = require("../Utils/mailer")
const bcrypt = require("bcrypt")


const createUserData = async (body) => {
  try {
    // 🔥 ADD THESE 3 DEBUG LINES
    console.log("🔥 SERVICE BODY:", body);
    console.log("🔥 RAW PASSWORD:", body.password, "TYPE:", typeof body.password, "LENGTH:", body.password?.length);
    console.log("🔥 ALL FIELDS:", { name: body.name, email: body.email, mobile: body.mobile });

    const { name, email, password, address1, address2, mobile } = body;

    if (!password) {
      throw new Error("Password is required");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      address1,
      address2,
      mobile,
    });

    return newUser;
  } catch (error) {
    console.error("Error in createUserData:", error);
    throw error;
  }
};




// Login the User
const loginUserData = async (body) => {
  const { email, password } = body;

  // Step 1: Find user by email
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // ✅ Step 2: COMPARE HASHED PASSWORD (your registration hashes it)
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Step 3: Login success
  return {
    message: "Login successful",
    userId: user._id,
    email: user.email,
    name: user.name // ✅ Bonus: return more user data
  };
};

const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// STEP 1: Generate & Store OTP
const loginUserService = async (email) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User with this email does not exist");

  const otp = generateOTP();

  // 1. Update or Create the OTP record in the DB
  await credentialModel.findOneAndUpdate(
    { email },
    { otp, createdAt: new Date() },
    { upsert: true }
  );

  // 2. ACTUALLY SEND THE MAIL
  try {
    // Ensure sendMail is imported correctly and is an async function
    await sendOTPEmail(email, otp);
    console.log(`✅ OTP ${otp} successfully sent to ${email}`);
  } catch (mailError) {
    console.error("❌ Mailer Error:", mailError);
    throw new Error("OTP stored but email failed to send. Check mailer config.");
  }

  return { success: true, message: "OTP sent to your email" };
};

// STEP 2: Just check if OTP is valid
const verifyOTPService = async (email, otp) => {
  const otpData = await credentialModel.findOne({
    email,
    otp: Number(otp),
  });

  if (!otpData) throw new Error("Invalid or expired OTP");

  return { success: true, message: "OTP verified successfully" };
};

// STEP 3: Save new password to userModel
const resetPasswordService = async (email, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await userModel.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  if (!updatedUser) throw new Error("User update failed");

  // Clean up: Remove OTP from database after successful reset
  await credentialModel.deleteOne({ email });

  return { success: true, message: "Password updated successfully. Please login." };
};





module.exports = {
  createUserData,
  loginUserData,
  // loginUserService,
  // verifyLoginData
  loginUserService,
  verifyOTPService,
  resetPasswordService



}

