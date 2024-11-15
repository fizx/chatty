const chatDiv = document.getElementById("chat");
const input = document.getElementById("messageInput");
const button = document.getElementById("sendButton");

function addMessage(text, isSent) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isSent ? "sent" : "received"}`;
  messageDiv.textContent = text;
  chatDiv.appendChild(messageDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (text) {
    window.parent.postMessage(text, "*");
    addMessage(text, true);
    input.value = "";
  }
}

button.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

window.screenId = "";

window.addEventListener("message", (event) => {
  console.log("got", event);
  const data = event.data.data.message.data || event.data.data.message;
  if (data instanceof Object) {
    if (data.ready) {
      console.log("setting screen id", data.ready.screenId);
      window.screenId = data.ready.screenId;
    }
    addMessage(JSON.stringify(data), false);
    return;
  }
  console.log(event.data.data.message.from.screenId, window.screenId);
  if (event.data.data.message.from.screenId !== window.screenId) {
    addMessage(data, false);
  }
});
