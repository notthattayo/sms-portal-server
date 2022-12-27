import Contact from "../models/contacts.js";

export const getContacts = async (req, res) => {
  try {
    const result = await Contact.find()
      .collation({ locale: "en" })
      .sort({ name: 1 });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const addContact = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  console.log(name, phone);

  try {
    const existingContact = await Contact.findOne({ phone });
    if (existingContact) {
      return res.status(500).json({ message: "Contact Already exists" });
    }

    const result = await Contact.create({
      name,
      phone,
    });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const updateContact = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const _id = req.body.id;
  console.log(name, phone);

  try {
    const existingContact = await Contact.findOne({ phone });

    if (!existingContact) {
      return res.status(500).json({ message: "Contact does not exist" });
    }

    if (!name || !phone) {
      return res.status(500).json({ message: "Name or Phone cannot be empty" });
    }

    const result = await Contact.findOneAndUpdate({ _id }, { name, phone });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const deleteContact = async (req, res) => {
  const _id = req.params.id;

  console.log(_id, "id");
  try {
    const existingContact = await Contact.findOne({ _id });

    if (!existingContact) {
      return res.status(500).json({ message: "Contact does not exist" });
    }

    const result = await Contact.findOneAndDelete({ _id });

    console.log(result, "rs");
    res.status(200).json({ result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
