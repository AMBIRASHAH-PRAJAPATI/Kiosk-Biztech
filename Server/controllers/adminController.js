import UserModel from "../model/userModel.js";
import { hashPassword } from "../utils/authHelper.js";

const adminAuthcontroller = async (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(500).json(`error from the admin rout ${error}`);
  }
};

// Fetch user data by ID
export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ userData: user });
  } catch (error) {
    res.status(500).json({ message: `Error fetching user data: ${error}` });
  }
};

// Update user data by ID (Partial Update)

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { username, email, phone, password } = req.body;

  try {
    const updateData = { username, email, phone };

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  adminAuthcontroller,
  getUserById,
  updateUserById,
};

//

//

///

//

//

//

// // *-------------------
// // * get all user
// // *-------------------
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await UserModel.find({}, { password: 0 });
//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// };

// // *-------------------
// // * Add user
// // *-------------------
// const addUser = async (req, res) => {
//   try {
//     const { username, email, phone, password, confirmPassword, isAdmin } =
//       req.body;

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const userExist = await UserModel.findOne({ phone });

//     if (userExist) {
//       return res.status(400).json({ message: "Phone number already exists" });
//     }

//     const userCreated = await UserModel.create({
//       username,
//       email,
//       phone,
//       password,
//       isAdmin,
//     });

//     res.status(201).json({
//       msg: "user added Successful",
//       userId: userCreated._id.toString(),
//     });
//   } catch (error) {
//     console.error("Error adding user:", error);
//     res.status(500).json("Internal server error");
//   }
// };

// // *-------------------
// // * edit user
// // *-------------------
// const getUserById = async (req, res) => {
//   try {
//     const id = req.params.id; // same ad route (/:id)
//     const data = await User.findOne({ _id: id }, { password: 0 });
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

// // *-------------------
// // * update user
// // *-------------------
// const updateUserById = async (req, res) => {
//   try {
//     const id = req.params.id; // same ad route (/:id)
//     const updatedUserdata = req.body;

//     const updateData = await UserModel.updateOne(
//       { _id: id },
//       {
//         $set: updatedUserdata,
//       }
//     );
//     res.status(200).json(updateData);
//   } catch (error) {
//     next(error);
//   }
// };

// // *-------------------
// // * delete user
// // *-------------------
// const deleteUserById = async (req, res) => {
//   try {
//     const id = req.params.id; // same ad route (/:id)
//     await UserModel.deleteOne({ _id: id });
//     res.status(200).json({ message: "User Deleted Successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// export default {
//   adminAuthcontroller,
//   createcategory,
//   updatecategory,
//   getAllUsers,
//   deleteUserById,
//   getUserById,
//   updateUserById,
//   addUser,
// };
