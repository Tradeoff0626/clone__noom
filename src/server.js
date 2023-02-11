import http from "http";
import SocketIO from "socket.io";

import express from "express";

const app = express();

app.set("view engine", "pug");              //뷰 엔진을 pug로 설정
app.set("views", __dirname + "/views");     //뷰 파일 디렉토리를 /src/views로 설정

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));   //'/'의 렌더링은 home.pug로
app.get("/*", (req, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Noname";

  //2번째 인자는 전달 받은 데이터. 2번째 인자의 마지막 파라미터는 프론트엔드에서 처리할 콜백 함수명.
  socket.on("enter_room", (roomName, done) => {
    done();                       // 프론트엔드 템플릿의 'showRoom()'를 실행

    socket.join(roomName);                  // roomName에 해당하는 room에 소켓 객체를 join
    socket.to(roomName).emit("welcome", socket.nickname);    //roomName에 해당하는 room에 "welcome" 이벤트 및 닉네임 전달. (동일한 이름의 roomName에만 전달)
  })
  
  socket.on("disconnecting", () => {        //접속 종료 기본 이벤트. 접속 종료 '직전'에 발생. (접속 종료 시, 닉네임 표시를 위해 전달)
    socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
  })

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);   //설정한 room에 메시지 전달.(동일한 room에 메시지 전달)

    done();                                     //addMessage(msg)를 호출하여 본인의 메시지를 화면에 출력
  })

  socket.on("nickname", nickname => socket["nickname"] = nickname)    //닉네임 변경 이벤스 수신 처리 시 닉네임 속성 변경
})

httpServer.listen(3000, () => console.log("Listening on http://localhost:3000"));