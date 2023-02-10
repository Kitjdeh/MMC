import http from "http";
import express from "express";

import io from "socket.io";

const app = express();

const server = http.createServer(app);

const wsServer = io(server, { cors: { origin: "*" } });
const port = 8001;

wsServer.listen(port);

wsServer.on("connection", (socket) => {
  console.log("connect client by Socket.io");

  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });

  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });

  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });

  socket.on("setScreen", (roomName, num) => {
    socket.to(roomName).emit("setScreen", num);
  });
});
