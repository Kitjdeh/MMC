import React, { useEffect, useRef } from "react";

const socket = new WebSocket(`ws://localhost:8000`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function makeMessage(type, payload, nickName, lectureNoteId) {
  const msg = { type, payload, nickName, lectureNoteId };
  return JSON.stringify(msg);
}

const LectureChat = () => {
  const messageListRef = useRef();
  const messageFormRef = useRef();
  const nickName = "SSAFY";
  const lectureNoteId = "2";
  useEffect(() => {
    socket.addEventListener("message", (msg) => {
      const message = JSON.parse(msg.data);
      if (message.lectureNoteId === lectureNoteId && message.type === "new_message") {
        const li = document.createElement("li");
        li.style.listStyle = "none";
        if (nickName === message.nickName) {
          li.style.textAlign = "right";
          li.innerText = message.payload;
        } else {
          console.log("why");
          li.style.textAlign = "left";
          li.innerText = message.nickName + " : " + message.payload;
        }
        messageListRef.current.append(li);
      }
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const input = messageFormRef.current.querySelector("input");
    socket.send(makeMessage("new_message", input.value, nickName, lectureNoteId));
    input.value = "";
  }

  return (
    <>
      <header>
        <h1>Noom</h1>
      </header>
      <main>
        <ul ref={messageListRef} />
        <form onSubmit={handleSubmit} ref={messageFormRef}>
          <input type="text" placeholder="write a msg" required />
          <button>Send</button>
        </form>
      </main>
    </>
  );
};

export default LectureChat;
