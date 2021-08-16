const socket = new WebSocket(`ws://${window.location.host}`);

const msgList = document.querySelector("ul");
const msgForm = document.querySelector("form");

socket.addEventListener("open", () => {
  console.log("connected to server");
});

socket.addEventListener("message", (message) => {
  console.log("just got this : ", message.data);
});

socket.addEventListener("close", () => {
  console.log("disconneted from server");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = msgForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

msgForm.addEventListener("submit", handleSubmit);
