import React, { useEffect, useRef } from "react";
import styled from "styled-components";

function makeMessage(type, payload, nickName, lectureNoteId) {
  const msg = { type, payload, nickName, lectureNoteId };
  return JSON.stringify(msg);
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 17%;
  position: fixed;
  top: 0;
  right: 0;
`;

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #f2f2f2;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledMain = styled.main`
  width: 100%;
  height: 80vh; /* set height to 100 viewport height units */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledMessageList = styled.ul`
  width: 100%;
  height: 300px;
  overflow: auto;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const StyledMessageForm = styled.form`
  width: 17%;
  display: flex;
  justify-content: center;
  padding: 16px;
  background-color: #f2f2f2;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  right: 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
  width: 100px;
  padding: 8px;
  margin-left: 16px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const LectureChat = ({ nickName, lectureNoteId, socket }) => {
  const messageListRef = useRef();
  const messageFormRef = useRef();

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
    <StyledContainer>
      <StyledHeader>
        <h1>채팅</h1>
      </StyledHeader>

      <StyledMain>
        <StyledMessageList ref={messageListRef} />
        <StyledMessageForm onSubmit={handleSubmit} ref={messageFormRef}>
          <StyledInput type="text" required />
          <StyledButton>보내기</StyledButton>
        </StyledMessageForm>
      </StyledMain>
    </StyledContainer>
  );
};
export default LectureChat;

