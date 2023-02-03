import express from "express";

const app = express();

app.set("view engine", "pug");              //뷰 엔진을 pug로 설정
app.set("views", __dirname + "/views");     //뷰 파일 디렉토리를 /src/views로 설정

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));   //'/'의 렌더링은 home.pug로
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");
app.listen(3000, handleListen);