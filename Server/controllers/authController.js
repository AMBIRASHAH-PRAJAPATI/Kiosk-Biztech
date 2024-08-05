import { z } from "zod";
import UserModel from "../model/userModel.js";
import { hashPassword } from "../utils/authHelper.js";

// *-------------------
// * Home Page
// *-------------------
const home = async (req, res) => {
  try {
    res.status(200).send("start from server");
  } catch (error) {
    console.log(error);
  }
};

// *-------------------
// * User register
// *-------------------
// const registerController = async (req, res) => {
//   try {
//     const { username, email, phone, password } = req.body;

//     const userExist = await UserModel.findOne({ phone });
//     if (userExist) {
//       return res.status(400).send({ message: "Phone number Exists" });
//     }

//     const hashedPassword = await hashPassword(password);
//     const user = new UserModel({
//       username,
//       email,
//       phone,
//       password: hashedPassword,
//     });
//     await user.save();

//     res.status(201).send({
//       success: true,
//       token: await user.generateToken(),
//       message: "User created successfully",
//       userId: user._id.toString(),
//     });
//   } catch (error) {
//     console.log(error);
//     if (error instanceof z.ZodError) {
//       return res.status(400).send({
//         success: false,
//         message: "Validation error",
//         errors: error.errors,
//       });
//     }
//     res.status(500).send({
//       success: false,
//       message: "Error in Registration",
//       error,
//     });
//   }
// };

// *-------------------
// * User Login
// *-------------------

const loginController = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const userExist = await UserModel.findOne({ phone });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid details" });
    }

    const isValidUser = await userExist.comparePassword(password);

    if (isValidUser) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Phone number & Password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Internal Server Error");
  }
};

// *-------------------
// * user data
// *-------------------

const usercontroller = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json(`error from the user rout ${error}`);
  }
};

export default { home, loginController, usercontroller };
