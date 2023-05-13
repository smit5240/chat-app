const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const inputMessage = document.getElementById("message-input");
const sendbtn = document.getElementById("send-btn");
const messagecontainer = document.querySelector(".chat-screen");
var audio = new Audio("ting.mp3");
const append = (message, position, messagebox) => {
  const messageElement = document.createElement("p");
  messageElement.innerText = message;
  messageElement.classList.add(messagebox);
  messageElement.classList.add(position);
  messagecontainer.append(messageElement);
  audio.play();
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inputMessage.value;
  append(`You : ${message}`, "right", "textbox");
  socket.emit("send", message);
  inputMessage.value = "";
});
const name = prompt("Enter your name ");
socket.emit("new-user-joined", name);
socket.on("user-joined", (name) => {
  append(`${name} joined the group`, "join");
});
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left", "textbox");
});
socket.on("leave", (data) => {
  append(`${data} left the group`, "disconnect");
});
