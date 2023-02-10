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

socket.on("welcome", () => {
  addMessage("someone joined!");
})

socket.on("bye", () => {
  addMessage("someone left ㅠ_ㅠ");
})