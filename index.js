const express = require("express");
const cors = require("cors");
require('dotenv').config()

function notifyTelexChannel(){
  const url = "https://ping.telex.im/v1/webhooks/019515f4-7192-7f4c-8cf6-6e3c019e67fa";
  const data = {
    "event_name": "Ping to RemindME",
    "message": "PING from Telex to RemindME successfully",
    "status": "success",
    "username": "RemindME"
  };
  
  fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(console.log)
  .catch(console.error);
}

const app = express();

let sendReminder = false

function getHydrationMessage() {
  const date = new Date();
  const hours = date.getHours();
  let message;

  switch (hours) {
    case 7:
      message = "Good morning! Start your day with a glass of water. Drinking water when you wake up helps rehydrate your body, kick-starts metabolism, and flushes out toxins.";
      sendReminder = true;
      break;
    case 11:
      message = "It's mid-morning! Take a moment to drink a glass of water. Staying hydrated keeps you focused and energized as you power through your morning tasks.";
      sendReminder = true;
      break;
    case 13:
      message = "Lunchtime is here! Drinking water before or after your meal aids digestion and helps your body absorb nutrients more efficiently.";
      sendReminder = true;
      break;
    case 15:
      message = "It's the afternoon slump! Rehydrate with a glass of water to stay refreshed and keep your energy levels up for the rest of the day.";
      sendReminder = true;
      break;
    case 17:
      message = "It's late afternoon! Drinking water now will help you stay hydrated and prevent fatigue as you finish up your day.";
      sendReminder = true;
      break;
    case 19:
      message = "It's evening time! A glass of water now helps keep you hydrated as you wind down for the night.";
      sendReminder = true;
      break;
    case 21:
      message = "Almost bedtime! Drinking water before bed can aid in digestion, circulation, and muscle recovery as you sleep.";
      sendReminder = true;
      break;
    default:
      message = "This is your friendly reminder to take a moment and drink a glass of water! Staying hydrated is key to maintaining your health and energy throughout the day.";
      sendReminder = false;
  }

  return message;
}

app.use(cors());

app.get('/date', (req,res)=>{
  res.send(time)
})

app.get("/drink-water", (req, res) => {
  notifyTelexChannel()
  
  const message = getHydrationMessage()
  if (sendReminder === false) {
    res.status(200).json({
      "message": "Not yet!"
    })
    return
  }

  const Mailjet = require("node-mailjet");
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.SENDER_EMAIL,
          Name: "RemindME - Drink Water",
        },
        To: [
          {
            Email: process.env.RECIPIENT_EMAIL,
            Name: "You",
          },
        ],
        Subject: "Time to Hydrate! 💧",
        TextPart: "Don't forget to drink water and stay healthy!",
        HTMLPart: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; text-align: center;">
            <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
              <h2 style="color: #007BFF;">Time to Hydrate! 💧</h2>
              <p style="font-size: 18px; color: #333333;">
                Hi there,
              </p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;">
                ${message}
              </p>
              <p style="font-size: 16px; color: #555555;">
                Remember, consistency is the key to good hydration. Keep up the great work!
              </p>
              <a href="https://www.mailjet.com/" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px; margin-top: 20px;">Learn More</a>
              <p style="font-size: 14px; color: #999999; margin-top: 30px;">
                Stay healthy,<br>
                RemindME - Drink Water
              </p>
            </div>
          </div>`,
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
      res.status(200).json({ message: "Email sent successfully!" });
    })
    .catch((err) => {
      console.error("Mailjet Error:", err);
      res.status(500).json({ error: "Failed to send email" });
    });
});


app.listen(8000, () => {
  console.log(`Server running on port 8000`);
});