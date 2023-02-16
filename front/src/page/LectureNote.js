import React, { useState, useMemo, useEffect, useRef } from "react";
import { Grid, Button, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LectureQuestion from "../component/LectureQuestion";
import LectureCode from "../component/LectureCode";
import LectureGraffiti from "../component/LectureGraffiti";
import LectureWebRTC from "../component/LectureWebRTC";
import LectureChat from "../component/LectureChat";
import Clock from "../component/Clock";
import jsPDF from "jspdf";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { userinfoAction } from "../redux/actions/userinfoAction";
import { questionAction } from "../redux/actions/questionAction";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
//webRTC setting
const socketRTC = io("localhost:8001", { transports: ["websocket"] });

const useStyles = makeStyles({
  bar: {
    backgroundColor: "#f6edff",
    textAlign: "center",
  },
  word: {
    textAlign: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 16,
  },
});

// WebSocket
const socket = new WebSocket(`ws://localhost:8000`);
socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

const LectureNote = () => {
  let muted = false;
  const muteBtn = useRef();
  const myAudio = useRef();
  const peersAudio = useRef();
  const img = new Image();
  // img.src =
  //   "https://ssafy-mmc.s3.ap-northeast-2.amazonaws.com/13793120a9ba4c50a4e2bd9f390abf1f.jpg";
  const [start, setStart] = useState(false); // 둘다 들어올시 시작
  const [openModal, setOpenModal] = useState(false); // 준비 버튼 누를시 모달창 뜸
  const [time, setTime] = useState(false);
  const user = useSelector((state) => state.userinfo.userinfo);
  const lecture = useSelector((state) => state.note.note);
  const question = useSelector((state) => state.question.question);
  const nickName = user.nickname;
  const lectureNoteId = lecture;
  const userId = user.userId;
  const studentId = question.userId;
  const teacher = useSelector((state) => state.admin.user);
  const dispatch = useDispatch();
  img.src = question.imageUrl;
  // console.log("USER", user);
  // console.log("LECTURE", lecture);
  // console.log("QUESTION", question);
  // console.log("teacher", teacher);

  // const lectureNoteId = 2;
  // const nickName = "SSAFY";
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const [content, setContent] = useState("Question");
  const [check, setCheck] = useState(0);
  const [peerStream, setPeerStream] = useState();
  const [isScreen, setScreen] = useState(0);
  const [myStream, setMyStream] = useState();
  const [myPeerConnection] = useState(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    })
  );
  const [pdfimg, setPdfimg] = useState({
    Question: "",
    Graffiti: "",
  });
  const [clk, setClk] = useState({
    hour: 0,
    min: 0,
    sec: 0,
    ttlTime: 0,
    change: 0,
  });

  // modal
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const update = () => {
    setTime(13);
    question.progress = 2;
    user.point -= question.point;
    teacher.point += question.point;
    teacher.lectureCount++;
    teacher.temperature += value * 2;
    dispatch(questionAction.modifyQuestion(question));
    dispatch(userinfoAction.modifyUser(user));
    dispatch(userinfoAction.modifyUser(teacher));
  };
  // webRTC

  const handleAddStream = (data) => {
    setPeerStream(data.stream);
    let audioTrack = data.stream.getAudioTracks();

    peersAudio.current.srcObject = new MediaStream(audioTrack);
    console.log(peersAudio.current.srcObject);
  };
  const handleIce = (data) => {
    console.log("sent candidate");
    socketRTC.emit("ice", data.candidate, lectureNoteId);
  };

  const handleOpen = () => {
    socketRTC.emit("timerStart", lectureNoteId);
    setOpenModal(true);
  };

  const handleScreen = (data) => {
    socketRTC.emit("setScreen", lectureNoteId, data);
    setScreen(data);
  };

  const handleMuteClick = () => {
    if (!muted) {
      muted = true;
      console.log(myStream.getAudioTracks()[0]);
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        console.log(track.enabled);
      });
      // setMyStream(myStream);
      muteBtn.current.innerText = "Unmute";
    } else {
      muted = false;
      console.log("making unmute");

      muteBtn.current.innerText = "Mute";
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        console.log(track.enabled);
      });
      // setMyStream(myStream);
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        //
        setMyStream(stream);
        stream.getTracks().forEach((track) => myPeerConnection.addTrack(track, stream));
        socketRTC.emit("join_room", lectureNoteId);
      });

    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("addstream", handleAddStream);

    socketRTC.on("connect", () => {
      console.log("connected to server");
    });

    socketRTC.on("welcome", async () => {
      const offer = await myPeerConnection.createOffer();
      console.log("sent the offer");
      myPeerConnection.setLocalDescription(offer);
      socketRTC.emit("offer", offer, lectureNoteId);
    });

    socketRTC.on("offer", async (offer) => {
      console.log("received the offer");
      console.log(offer);
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socketRTC.emit("answer", answer, lectureNoteId);
      console.log("sent the answer");
    });

    socketRTC.on("answer", (answer) => {
      console.log(answer);
      myPeerConnection.setRemoteDescription(answer);
      console.log("received the answer");
    });

    socketRTC.on("ice", (ice) => {
      console.log("caught candidate");
      console.log(ice);
      myPeerConnection.addIceCandidate(ice);
    });

    socketRTC.on("setScreen", (num) => {
      setScreen(num);
      console.log(num);
    });

    socketRTC.on("settingTime", (obj) => {
      setStart(true);
      peersAudio.current.play();
      console.log(peersAudio.current.srcObject);
      clk.hour = obj.hour;
      clk.min = obj.min;
      clk.sec = obj.sec;
      clk.ttlTime = obj.ttlTime;
      clk.change = obj.change;
      console.log(clk);

      socketRTC.emit("setTime", lectureNoteId);
    });

    socketRTC.on("setTime", (obj) => {
      setStart(true);
      peersAudio.current.play();
      console.log(peersAudio.current.srcObject);
      clk.hour = obj.hour;
      clk.min = obj.min;
      clk.sec = obj.sec;
      clk.ttlTime = obj.ttlTime;
      clk.change = obj.change;
      console.log(clk);
    });

    socketRTC.on("goodbye", () => {
      // myPeerConnection.getSenders().map((sender) => sender.replaceTrack(null));
      // console.log(myPeerConnection.getSenders().map((sender) => sender.track));

      // setPeerStream(null);
      console.log("byebye");
    });

    return () => {
      socketRTC.off("connect");
      myPeerConnection.removeEventListener("icecandidate", handleIce);
      myPeerConnection.removeEventListener("addstream", handleAddStream);
    };
  }, []);

  const handleDownload = async () => {
    console.log(openModal);
    const pdf = new jsPDF();
    // await new Promise((resolve) => {
    //   img.onload = resolve;
    // });
    // pdf.addImage(img.src, "JPEG", 0, 0, 210, 297);
    // pdf.addPage();
    pdf.addImage(pdfimg.Question, "PNG", 0, 0, img.width / 5, (img.height - 800) / 5);
    pdf.addPage();
    pdf.addImage(pdfimg.Graffiti, "PNG", 0, 0, img.width / 5, (img.height - 800) / 5);
    pdf.save("canvas-image.pdf");
  };

  const category = useMemo(
    () => ({
      WebRTC: (
        <LectureWebRTC
          lectureNoteId={lectureNoteId}
          myStream={myStream}
          peerStream={peerStream}
          myPeerConnection={myPeerConnection}
          isScreen={isScreen}
          handleScreen={handleScreen}
          check={check}
          setCheck={setCheck}
        />
      ),
      Question: (
        <LectureQuestion
          lectureNoteId={lectureNoteId}
          check={check}
          setCheck={setCheck}
          img={img}
          pdfimg={pdfimg}
          socket={socket}
          nickName={nickName}
        />
      ),
      Code: <LectureCode check={check} setCheck={setCheck} />,
      Graffiti: (
        <LectureGraffiti
          lectureNoteId={lectureNoteId}
          check={check}
          setCheck={setCheck}
          img={img}
          pdfimg={pdfimg}
          socket={socket}
          nickName={nickName}
        />
      ),
      Chat: <LectureChat nickName={nickName} lectureNoteId={lectureNoteId} socket={socket} />,
      Clock: (
        <Clock clk={clk} time={time} setTime={setTime} userId={userId} studentId={studentId} />
      ),
    }),
    [myStream, peerStream, myPeerConnection, clk]
  );

  return (
    <Grid container justify="space-between">
      <audio ref={peersAudio}></audio>
      {!start ? (
        <>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            준비가 됫으면 눌러주세요!!!!
          </Button>
          <Modal open={openModal} className={classes.modal}>
            <Box className={classes.paper}>
              <h2>대기중</h2>
              <p>상대방이 아직 입장하지 않았습니다!!</p>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          {time === 9 ? (
            <Modal open={openModal} className={classes.modal}>
              <Box className={classes.paper}>
                <h2>종류9분전</h2>
                <p>!!</p>
                <Button onClick={() => setTime(0)}>확인</Button>
              </Box>
            </Modal>
          ) : time === 10 ? (
            <Modal open={openModal} className={classes.modal}>
              <Box className={classes.paper}>
                <h2>선생입장종료</h2>
                <p>!!</p>
                <Button onClick={() => goHome()}>종료</Button>
              </Box>
            </Modal>
          ) : time === 11 ? (
            <Modal open={openModal} className={classes.modal}>
              <Box className={classes.paper}>
                <h2>학생입장pdf</h2>
                <Button onClick={() => handleDownload()}>pdf출력</Button>
                <Button onClick={() => setTime(12)}>건너띄기</Button>
              </Box>
            </Modal>
          ) : time === 12 ? (
            <Modal open={openModal} className={classes.modal}>
              <Box className={classes.paper}>
                <h2>학생입장선생평가</h2>
                <p>!!</p>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={handleChange}
                  precision={1}
                />
                <Button onClick={() => update()}>평가</Button>
              </Box>
            </Modal>
          ) : time === 13 ? (
            <Modal open={openModal} className={classes.modal}>
              <Box className={classes.paper}>
                <h2>학생입장종료</h2>
                <p>!!</p>
                <Button onClick={() => goHome()}>종료</Button>
              </Box>
            </Modal>
          ) : (
            <></>
          )}
          <Grid item xs={1} className={classes.bar}>
            Buttons
            <Grid container direction="column" alignItems="flex-start" spacing={2}>
              <Grid item xs={4} className={classes.word}>
                <Button onClick={() => setContent("Question")} variant="contained" color="primary">
                  Question
                </Button>
              </Grid>
              <Grid item xs={4} className={classes.word}>
                <Button onClick={() => setContent("Code")} variant="contained" color="primary">
                  Code
                </Button>
              </Grid>
              <Grid item xs={4} className={classes.word}>
                <Button onClick={() => setContent("Graffiti")} variant="contained" color="primary">
                  Graffiti
                </Button>
              </Grid>
              <Grid item xs={4} className={classes.word}>
                <Button onClick={() => setContent("WebRTC")} variant="contained" color="primary">
                  WebRTC
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} className={classes.bar}>
            Screen
            <Box>{category["Clock"]}</Box>
            <button id="mute" type="button" onClick={handleMuteClick} ref={muteBtn}>
              Mute
            </button>
            {<Box>{category[content]}</Box>}
          </Grid>
          <Grid item xs={2} className={classes.bar}>
            Chat Window
            <Box>{category["Chat"]}</Box>
          </Grid>
          <button onClick={handleDownload}>Download</button>
        </>
      )}
      ;
    </Grid>
  );
};

export default LectureNote;
