function getHydrationMessage() {
  const date = new Date();
  const hours = date.getHours();
  let message;
  let sendReminder = false;

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

  return { message, sendReminder };
}

module.exports = { getHydrationMessage };
