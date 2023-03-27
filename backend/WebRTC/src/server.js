import http from "http";
import express from "express";

import io from "socket.io";

const app = express();

const server = http.createServer(app);

const wsServer = io(server, { cors: { origin: "*" } });
const port = 8001;
const status = {
  2: {
    hour: 0,
    min: 0,
    sec: 0,
    ttlTime: 0,
    change: 0,
  },
};

const roomNumber = "2";

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });

  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}
const handleListen = () => console.log(`Listening on localhost:${port}`);

wsServer.listen(port, handleListen);

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


  // 시간 설정
  socket.on("timerStart", (roomName) => {
    socket.join(roomName);
    console.log(status[roomName]);
    wsServer.sockets.emit("room_change", publicRooms());

    console.log(countRoom(roomName));
    if (!status[roomName]) {
      status[roomName] = {
        hour: 0,
        min: 0,
        sec: 0,
        ttlTime: 0,
        change: 0,
      };
    }

    if (countRoom(roomName) === 2) {
      let time = new Date();
      status[roomName].hour = time.getHours();
      status[roomName].min = time.getMinutes();
      status[roomName].sec = time.getSeconds();
    }

    status[roomName].change = countRoom(roomName);
    console.log(status[roomName]);
    socket.to(roomName).emit("settingTime", status[roomName]);
  });

  socket.on("setTime", (roomName) => {
    socket.to(roomName).emit("setTime", status[roomName]);
  });

  socket.on("disconnect", (data) => {
    const roomNum = roomNumber;
    console.log("byebye");
    socket.to("12345").emit("goodbye");
    socket.to(roomNum).emit("stopTime");
    let time = new Date();

    if (countRoom(roomNum) !== status[roomNum].change) {
      console.log(time);

      status[roomNum].ttlTime +=
        time.getHours() * 3600 +
        time.getMinutes() * 60 +
        time.getSeconds() -
        (status[roomNum].hour * 3600 + status[roomNum].min * 60 + status[roomNum].sec);
    }

    status[roomNum].change = countRoom(roomNum);

    wsServer.sockets.emit("room_change", publicRooms());
  });
});
