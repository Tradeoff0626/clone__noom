const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");


socket.addEventListener("open", () => {
  console.log("Connection to Server");
})

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
})

/**
 * 메시지 수신 시 처리
 */
socket.addEventListener("message", (message) => {
  console.log("Just got this:", message.data, "from the server");
})

/**
 * form submit 기능 구현
 */
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
})