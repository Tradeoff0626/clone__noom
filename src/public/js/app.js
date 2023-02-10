const socket = io();

const welcome = document.getElementById("welcome");
const form = document.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();

  const input = form.querySelector("input");
  
  //2번째 인자는 전달될 데이터(JSON 타입으로 여러 데이터를 묶어서 전달 가능)
  //socket.emit("enter_room", { payload: input.value });    

  //2번째 인자부터는 전달될 데이터. 마지막 인자는 서버(백엔드)에서 전달하여 호출되어 실행되는 프론트엔드 콜백 함수
  socket.emit("enter_room", input.value, () => console.log("server is done!"));
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);