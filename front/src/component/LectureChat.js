import React, { useEffect, useRef } from "react";

const socket = new WebSocket(`ws://localhost:8000`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function makeMessage(type, payload, name) {
  const msg = { type, payload, name };
  return JSON.stringify(msg);
}

const LectureChat = () => {
  const messageListRef = useRef();
  const messageFormRef = useRef();
  const name = "김정민";
  useEffect(() => {
    socket.addEventListener("message", (msg) => {
      const message = JSON.parse(msg.data);
      if (message.type === "new_message") {
        const li = document.createElement("li");
        // li.style.textAlign = (name === message.username) ? "right" : "left";
        li.style.textAlign = "left";
        li.style.listStyle = "none";
        li.innerText = name + " : " + message.payload;
        messageListRef.current.append(li);
      }
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const input = messageFormRef.current.querySelector("input");
    socket.send(makeMessage("new_message", input.value, name));
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
