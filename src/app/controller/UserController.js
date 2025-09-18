import { Person } from "../models/Person.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import ApiResponse from "../response/ApiResponse.js"

class UserController {
  index(req, res) {
    res.send("Hello from UserController");
  }

  async signUp(req, res) {
    try {
      const { email, name, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newPerson = new Person({ email, name, password: hashedPassword });
      await newPerson.save();

      return ApiResponse.success(res, newPerson, "User created successfully");

    } catch (err) {
      return ApiResponse.error(res, err.message);
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      console.log(email, password);

      const user = await Person.findOne({ email });

      console.log(user);

      if (!user) {
        return ApiResponse.error(res, "User not exited!", 401);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      console.log(isMatch);
      if (!isMatch) {
        return ApiResponse.error(res, "Invalid credentials", 401);
      }

      const token = jwt.sign({name: user.name, id: user._id}, 'test#secret', { expiresIn: '1h' });

      return ApiResponse.success(res, token, "User signed in successfully");

    } catch (err) {
      return ApiResponse.error(res, err.message);
    } 
  }

  async introspect(req, res) {
    const token = req.header('Authorization');
    const decodedToken = jwt.verify(token, 'test#secret');
    if (!decodedToken ||  decodedToken.exp * 1000 < Date.now()) {
      return ApiResponse.error(res, "Invalid token", 401);
    }
    return ApiResponse.success(res, decodedToken, "Token is valid");
  }

  async findUserByEmail(req, res) {
    try {
      const { email } = req.query;
      const user = await Person.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    const { email, name, age } = req.body;

    const personData = await Person.findOne({ email });
    if (personData.length === 0) {
      return res.status(404).send("User not found");
    }

    if (name) personData.name = name;
    if (age) personData.age = age;

    const updatedUser = await personData.save();
    res.json(updatedUser);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = await Person.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  }

  async listUsers(req, res) {
    const users = await Person.find();
    res.json(users);
  }
}

export default new UserController();
