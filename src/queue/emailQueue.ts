import { Queue } from "bullmq";

export const emailQueue = new Queue("email-queue", {
  connection: {
    url: "use your redis url",
  },
});
