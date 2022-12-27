import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Employee = mongoose.model("Employees", employeeSchema);

export default Employee;
