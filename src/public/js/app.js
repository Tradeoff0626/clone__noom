const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

/**
 * message 설정
 * @param {*} type - "nickname"/"new_message" 타입 설정
 * @param {*} payload - 메시지 데이터
 */
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}


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
  //console.log("Just got this:", message.data, "from the server");
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
})

/**
 * form submit 기능 구현
 */
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
})

nicknameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value= "";
})