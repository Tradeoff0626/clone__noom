const socket = io();

const welcome = document.getElementById("welcome");
const form = document.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

/**
 * room 이름 입력 시, room 입력 숨김/메시지 입력 표시
 */
function showRoom() {
  welcome.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room - ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();

  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);

  roomName = input.value;           //방 이름 설정
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);