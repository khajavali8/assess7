import UserModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
import EmployeeModel from "../models/employeeModels.js"

dotenv.config();
const SecretKey = process.env.JWT_SECRET
class UserController {
  async creatingUser (req, res){
    try {
      const CreateUser = new UserModel(req.body);
      console.log(CreateUser)

const savedUser = await CreateUser.save()
      res.status(201).json({message:"User Created successfully",savedUser});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  async loginUser(req, res) {
    try {
      const Loginuser = await UserModel.findOne({ userName: req.body.userName });
      if (!Loginuser) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(req.body.password, Loginuser.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign(Loginuser.toObject(),SecretKey);
      res
        .status(200)
        .json({ message: "User Login successfully ", token, Loginuser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async forgotPassword(req, res) {
    try {
      const user = await UserModel.findOne({ userName: req.body.userName });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = jwt.sign({ id: user._id }, SecretKey);
      res
        .status(200)
        .json({ message: "Password reset link sent successfully", token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async changePassword(req, res) {
    try {
      const id = req.user._id;
      console.log(id);
      console.log(req.user);
      const user = await UserModel.findById(ObjectId.createFromHexString(id));
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const salt = await bcrypt.genSalt(10);
      const newpassword = await bcrypt.hash(req.body.newPassword, salt);
      const updatedUser = await user.updateOne(
        { password: newpassword },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Password Updated successfully", updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

 

  async createemployee (req, res) {
    try {
      
        const employee = new EmployeeModel(req.body);
        const savedEmployee = await employee.save();
        console.log(savedEmployee);
        res.status(201).json({ message: "Employee Created successfully", savedEmployee });
      
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
   async getEmployee (req, res) {
    try {
      const getUser = await EmployeeModel.find();
      res.status(200).json(getUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
 
   async getEmployeeId (req, res) {
    try {
      const getUserbyId = await EmployeeModel.findById(req.params.id);
      if (!getUserbyId) {
        return res.status(404).json({ message: 'User not found',getUserbyId });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
 
    async updateEmployee(req, res) {
    try {
      const user = await EmployeeModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a user
    async deleteEmployee(req, res)  {
    try {
      const user = await EmployeeModel.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
}
export default new UserController();