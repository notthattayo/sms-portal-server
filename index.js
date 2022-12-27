import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import contactRoutes from "./routes/contacts.js";
import messageRoutes from "./routes/messages.js";
import employeeRoutes from "./routes/employees.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
var server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use("/", employeeRoutes);
app.use("/contacts", contactRoutes);
app.use("/messages", messageRoutes);

export const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL || "http://localhost:3000"],
  },
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`app running on port ${PORT}`));
    io.on("connection", (socket) => {
      console.log(socket.id);
    });
  })
  .catch((err) => {
    console.log("error" + "" + err.message);
  });
