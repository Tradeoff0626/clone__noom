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

/**
 * 웹소켓 서버 연결 시
 */
wss.on("connection", (socket) => {
  console.log("Connection to Browser");
  
  socket.on("close", () => console.log("Disconnected from Browser"));

  socket.on("message", (msg) => {
    socket.send(`${msg}`);          //메시지 echo
  })
})

server.listen(3000, handleListen);    //http 프로토콜과 ws 프로토콜 모두 사용 