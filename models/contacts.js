import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Contact = mongoose.model("Contacts", contactSchema);

export default Contact;
