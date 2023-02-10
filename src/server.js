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

  //2번째 인자는 전달 받은 데이터. 2번째 인자의 마지막 파라미터는 프론트엔드에서 처리할 콜백 함수명.
  socket.on("enter_room", (roomName, done) => {
    done();                       // 프론트엔드 템플릿의 'showRoom()'를 실행

    console.log(roomName);
    console.log(socket.id);
    console.log(socket.rooms);    // room은 동일한 namespace 내에서 방을 나누는 하위 소켓 그룹의 개념
    socket.join(roomName);        // roomName에 해당하는 room에 소켓 객체를 join
    console.log(socket.rooms);
  }) 
})

httpServer.listen(3000, () => console.log("Listening on http://localhost:3000"));