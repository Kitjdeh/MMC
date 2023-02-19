import { WebSocketServer } from "ws";

const redis = require("redis");
const redisInfo = {
  host: "127.0.0.1",
  port: 6379,
  db: 0, // Redis에서 사용하는 DB 번호
};
const client = redis.createClient(redisInfo);

const port = 8000;

const handleListen = () => console.log(`Listening on http://localhost:${port}`);

const wss = new WebSocketServer({ port }, handleListen);

const sockets = [];

wss.on("connection", (socket) => {
  function makeMessage(type, payload, nickName, lectureNoteId) {
    const msg = { type, payload, nickName, lectureNoteId };
    return JSON.stringify(msg);
  }
  function updatePicture(type, payload, nickName, lectureNoteId) {
    const msg = { type, payload, nickName, lectureNoteId };
    return JSON.stringify(msg);
  }
  sockets.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        console.log(message.lectureNoteId + "new_message");
        sockets.forEach((aSocket) =>
          aSocket.send(
            makeMessage(message.type, message.payload, message.nickName, message.lectureNoteId)
          )
        );
        console.log(message.nickName);
        break;
      case "picture1":
        console.log(message.lectureNoteId + "picture1");
        client.set(message.lectureNoteId + "picture1", message.payload);
        sockets.forEach((aSocket) =>
          aSocket.send(
            updatePicture(message.type, message.payload, message.nickName, message.lectureNoteId)
          )
        );
        break;
      case "first1":
        console.log(message.lectureNoteId + "first1");
        client.get(message.lectureNoteId + "picture1", (err, reply) => {
          socket.send(updatePicture("picture1", reply, message.nickName, message.lectureNoteId));
        });
        break;
      case "picture2":
        console.log(message.lectureNoteId + "picture2");
        client.set(message.lectureNoteId + "picture2", message.payload);
        sockets.forEach((aSocket) =>
          aSocket.send(
            updatePicture(message.type, message.payload, message.nickName, message.lectureNoteId)
          )
        );
        break;
      case "first2":
        console.log(message.lectureNoteId + "first2");
        client.get(message.lectureNoteId + "picture2", (err, reply) => {
          socket.send(updatePicture("picture2", reply, message.nickName, message.lectureNoteId));
        });
        break;
    }
  });
});
