const socket = io();

const welcome = document.getElementById("welcome");
const form = document.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

/**
 * 메시지를 받아서 화면의 채팅 리스트에 추가
 * @param {*} message - 화면에 출력될 메시지 
*/
function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

/**
 * 메시지를 입력한 경우의 처리
 * @param {*} event 
 */
function hadleMessageSubmit(event) {
  event.preventDefault();

  const input = room.querySelector("#msg input");
  const value = input.value;

  //
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  })
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();

  const input = room.querySelector("#name input");
  const value = input.value;

  socket.emit("nickname", value);
  input.value = "";
}

/**
 * room 이름 입력 시, room 입력 숨김/메시지 입력 표시
 */
function showRoom() {
  welcome.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room - ${roomName}`;

  //div #msg 의 submit에 이벤트 핸들러 등록(메시지)
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", hadleMessageSubmit);
  
  //div #name 의 submit에 이벤트 핸들러 등록(닉네임)
  const nameForm = room.querySelector("#name");
  nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();

  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);

  roomName = input.value;           //방 이름 설정
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", nickname => {
  addMessage(`${nickname} joined!`);
})

socket.on("bye", nickname => {
  addMessage(`${nickname} left ㅠ_ㅠ`);
})

socket.on("new_message", (msg) => {
  addMessage(msg);
})