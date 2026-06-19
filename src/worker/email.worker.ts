import { Worker } from "bullmq";
import sendEmail from "../sendEmail";

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    // console.log(job);
    await sendEmail(job.data);
  },
  {
    connection: {
      url: "use your redis url",
    },
  },
);

emailWorker.on("completed", (job) => console.log("Job done", job.id));
emailWorker.on("failed", (job) => console.log("Job failed"));
