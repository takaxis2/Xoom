const socket = new WebSocket(`ws://${window.location.host}`);

const msgList = document.querySelector("ul");
const msgForm = document.querySelector("#msg");
const nickForm = document.querySelector("#nick");

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("connected to server");
});
socket.addEventListener("close", () => {
  console.log("disconneted from server");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  msgList.append(li);
});

function handleSubmit(event) {
  event.preventDefault();
  const input = msgForm.querySelector("input");
  socket.send(makeMessage("message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

msgForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
