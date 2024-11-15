const chatDiv = document.getElementById("chat");
const input = document.getElementById("messageInput");
const button = document.getElementById("sendButton");

function addMessage(text, isSent) {
  if (text === latest) {
    return;
  }
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isSent ? "sent" : "received"}`;
  messageDiv.textContent = text;
  chatDiv.appendChild(messageDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

let latest = "";

function sendMessage() {
  const text = input.value.trim();
  if (text) {
    window.parent.postMessage(text, "*");
    addMessage(text, true);
    input.value = "";
  }
  latest = text;
}

button.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

window.addEventListener("message", (event) => {
  console.log("got", event);
  const data = event.data.data.message.data;
  if (data.joined) {
    addMessage(`User joined: ${JSON.stringify(event.data.data)}`, false);
    return;
  }
  addMessage(data, false);
});
