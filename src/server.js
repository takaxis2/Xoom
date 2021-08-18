import http from "http";
import express from "express";
import SocketIo from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const ioServer = SocketIo(httpServer);

ioServer.on("connection", (socket) => {
  //방 입장
  socket.on("enter_room", (roomName, showRoom) => {
    socket.join(roomName);
    showRoom();
    socket.to(roomName).emit("welcome");
  });

  //방 퇴장시에 join중인 방을 순회하며 bye를 emit
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye");
    });
  });

  //새로운 메세지 이벤트
  socket.on("new_message", (msg, room, done) => {
    console.log(msg);
    socket.to(room).emit("new_message", msg);
    done();
  });
});

// const sockets = [];

// wss.on("connection", (socket) => {
//   socket["nickname"] = "Anonymous";
//   sockets.push(socket);

//   console.log("connected to browser");
//   socket.on("close", () => {
//     console.log("disconnected from browser");
//   });

//   socket.on("message", (message) => {
//     const msg = JSON.parse(message);

//     switch (msg.type) {
//       case "message":
//         sockets.forEach((aSocket) => {
//           aSocket.send(`${socket.nickname} : ${msg.payload.toString()}`);
//         });
//         break;
//       case "nickname":
//         socket["nickname"] = msg.payload;
//         break;
//     }

//     //console.log(message.toString("utf-8"));
//   });
// });

httpServer.listen(3000, () => {
  console.log("listening on port 3000");
});
