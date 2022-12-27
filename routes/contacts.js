import express from "express";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../controllers/contacts.js";

const router = express();

router.get("/", getContacts);

router.post("/", addContact);

router.put("/", updateContact);

router.delete("/:id", deleteContact);

export default router;
