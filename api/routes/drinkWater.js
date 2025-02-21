const express = require("express");
const router = express.Router();
const { notifyTelexChannel } = require("../controllers/telexController");
const { sendTelexReminder } = require("../controllers/telexReminder")
const { getHydrationMessage } = require("../controllers/hydrationController");
const { sendHydrationEmail } = require("../utils/mailjetClient");

router.post("/", async (req, res) => {
  const payload = req.body;
  if (!payload || !payload.settings) {
    return res.status(400).json({ error: "Invalid payload: settings missing" });
  }
  
  const userEmailSetting = payload.settings.find(
    (setting) => setting.label.toLowerCase() === "user email"
  );
  if (!userEmailSetting || !userEmailSetting.default) {
    return res.status(400).json({ error: "User Email not provided in settings" });
  }
  const userEmail = userEmailSetting.default;
  
  await notifyTelexChannel();
  
  const { message, sendReminder } = getHydrationMessage();
  if (!sendReminder) {
    return res.status(200).json({ message: "Not yet!" });
  }

  if (payload.return_url){
    const channelUrl = payload.return_url;
    sendTelexReminder(channelUrl)
  }
  
  sendHydrationEmail(userEmail, message)
    .then((result) => {
      console.log("Mailjet response:", result.body);
      res.status(200).json({ message: "Email sent successfully!" });
    })
    .catch((err) => {
      console.error("Mailjet Error:", err);
      res.status(500).json({ error: "Failed to send email" });
    });
});

module.exports = router;
