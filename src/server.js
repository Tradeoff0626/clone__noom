import http from "http";
import WebSocket from "ws";

import express from "express";

const app = express();

app.set("view engine", "pug");              //뷰 엔진을 pug로 설정
app.set("views", __dirname + "/views");     //뷰 파일 디렉토리를 /src/views로 설정

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));   //'/'의 렌더링은 home.pug로
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];                 //connection되는 socket을 저장하기 위한 배열

/**
 * 웹소켓 서버 연결 시
 */
wss.on("connection", (socket) => {
  sockets.push(socket);             //connection되는 socket을 저장. 연결된 connection을 모두 사용하기 위한 용도
  console.log("Connection to Browser");
  
  socket.on("close", () => console.log("Disconnected from Browser"));

  socket.on("message", (msg) => {
    sockets.forEach( aSocket => aSocket.send(`${msg}`));          //연결된 모든 소켓에 메시지 전달
  })
})

server.listen(3000, handleListen);    //http 프로토콜과 ws 프로토콜 모두 사용 