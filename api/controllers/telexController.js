async function notifyTelexChannel() {
  const url = "https://ping.telex.im/v1/webhooks/019527bc-0d17-733a-b8a4-73eec1f9f5ed";
  const data = {
    event_name: "Ping to RemindME",
    message: "PING from Telex to RemindME successfully",
    status: "success",
    username: "RemindME"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log("Telex notification:", json);
  } catch (err) {
    console.error("Error notifying Telex:", err);
  }
}

module.exports = { notifyTelexChannel };
