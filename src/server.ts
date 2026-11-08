import express from "express";
// import sendEmail from "./sendEmail";
import { emailQueue } from "./queue/emailQueue";
import "./worker/email.worker";
import { serverAdapter } from "./bullmq";
import 'dotenv/config';



const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  // await sendEmail(req.body); // problem 3s culprite
  await emailQueue.add("email-queue", req.body, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    delay: 10000,
  });

  return res.json("Email Sent");
});

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
