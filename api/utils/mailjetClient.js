const Mailjet = require("node-mailjet");

function sendHydrationEmail(userEmail, message) {
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  return mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.SENDER_EMAIL,
          Name: "RemindME - Drink Water"
        },
        To: [
          {
            Email: userEmail,
            Name: "User"
          }
        ],
        Subject: "Time to Hydrate! 💧",
        TextPart: "Don't forget to drink water and stay healthy!",
        HTMLPart: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; text-align: center;">
            <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
              <h2 style="color: #007BFF;">Time to Hydrate! 💧</h2>
              <p style="font-size: 18px; color: #333333;">Hi there,</p>
              <p style="font-size: 16px; color: #555555; line-height: 1.5;">${message}</p>
              <p style="font-size: 16px; color: #555555;">Remember, consistency is key to good hydration. Keep up the great work!</p>
              <a href="https://www.mailjet.com/" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px; margin-top: 20px;">Learn More</a>
              <p style="font-size: 14px; color: #999999; margin-top: 30px;">Stay healthy,<br>RemindME - Drink Water</p>
            </div>
          </div>`
      }
    ]
  });
}

module.exports = { sendHydrationEmail };
