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
  function makeMessage(type, payload, nickname) {
    const msg = { type, payload, nickname };
    return JSON.stringify(msg);
  }
  function updatePicture(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
  }
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        console.log("new_message");
        sockets.forEach((aSocket) =>
          aSocket.send(makeMessage(message.type, message.payload, message.nickname))
        );
        break;
      case "picture":
        console.log("picture");
        client.set("picture", message.payload);
        sockets.forEach((aSocket) => aSocket.send(updatePicture(message.type, message.payload)));
        break;
      case "first":
        console.log("first");
        client.get("picture", (err, reply) => {
          socket.send(updatePicture("picture", reply));
        });
        break;
    }
  });
});
