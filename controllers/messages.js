import twilio from "twilio";
import dotenv from "dotenv";
import { io } from "../index.js";

import {
  messages,
  mockConversationsTo,
  mockUserConversationsFrom,
  messages2,
} from "../mocks.js";

dotenv.config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const getAllMessages = async (req, res) => {
  console.log("hitting", req.params.dateBefore);
  const dateSentBefore = req.params.dateBefore;
  client.messages
    .list({
      limit: 200,
      dateSentBefore,
    })
    .then((messages) => res.json(messages))
    .catch((err) => res.json(err, "err"));
};

export const listChatHistory = async (req, res) => {
  console.log("hitting chat history", req.body);

  const { from, to, dateBefore } = req.body;
  // Make two requests for history from and history to
  let historyFrom = [];
  let historyTo = [];

  if (from && to && dateBefore) {
    await client.messages
      .list({
        dateSentBefore: dateBefore,
        from,
        to,
        limit: 200,
      })
      .then((messages) => {
        console.log(messages);
        historyFrom = messages;
      })
      .catch((err) => console.log(err, "err"));

    await client.messages
      .list({
        dateSentBefore: dateBefore,
        from: to,
        to: from,
        limit: 200,
      })
      .then((messages) => {
        console.log(messages);
        historyTo = messages;
        res.json({
          historyFrom,
          historyTo,
        });
      })
      .catch((err) => console.log(err, "err"));
  } else {
    res.json({
      historyFrom,
      historyTo,
    });
  }
};

export const sendMessage = async (req, res) => {
  const body = req.body.body;
  const from = req.body.from;
  const to = req.body.to;
  console.log(body, from, to, "new message");

  client.messages
    .create({
      body,
      to, // Text this number
      from, // From a valid Twilio number
    })
    .then((message) => res.json([message]))
    .catch((err) => console.log(err));
};

export const getNewMessages = async (req, res) => {
  console.log("hitting-message", req);
  io.emit("new-message", [req.query]);
  res.send("message updated");
};
