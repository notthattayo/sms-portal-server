import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Employee from "../models/employees.js";

export const login = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  try {
    const existingEmployee = await Employee.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingEmployee.password
    );

    if (!existingEmployee || isPasswordCorrect) {
      return res.status(404).json({ message: "Wrong employee credentials" });
    }

    const token = jwt.sign(
      {
        email: existingEmployee.email,
        id: existingEmployee._id,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingEmployee, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(500).json({ message: "Account Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Employee.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
