import React, { useState, useMemo, useEffect } from "react";
import { Grid, Button, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LectureQuestion from "../component/LectureQuestion";
import LectureCode from "../component/LectureCode";
import LectureGraffiti from "../component/LectureGraffiti";
import LectureWebRTC from "../component/LectureWebRTC";
import LectureChat from "../component/LectureChat";
import Clock from "../component/Clock";
import jsPDF from "jspdf";
// import { useSelector } from "react-redux";
import io from "socket.io-client";

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
  const [start, setStart] = useState(false); // 둘다 들어올시 시작
  const [openModal, setOpenModal] = useState(false); // 준비 버튼 누를시 모달창 뜸
  // const nickName = useSelector((state) => state.userinfo.userinfo).nickName;
  // const lectureNoteId = useSelector((state) => state.note.note);
  const lectureNoteId = 2;
  const nickName = "SSAFY";
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
  const img = new Image();
  img.src =
    "https://ssafy-mmc.s3.ap-northeast-2.amazonaws.com/13793120a9ba4c50a4e2bd9f390abf1f.jpg";

  // webRTC

  const handleAddStream = (data) => {
    setPeerStream(data.stream);
  };
  const handleIce = (data) => {
    console.log("sent candidate");
    socketRTC.emit("ice", data.candidate, lectureNoteId);
  };

  const handleOpen = () => {
    socketRTC.emit("join_room", lectureNoteId);
    socketRTC.emit("timerStart", lectureNoteId);
    setOpenModal(true);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((stream) => {
        //
        setMyStream(stream);

        stream.getTracks().forEach((track) => myPeerConnection.addTrack(track, stream));
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
          setScreen={setScreen}
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
        />
      ),
      Chat: <LectureChat nickName={nickName} lectureNoteId={lectureNoteId} socket={socket} />,
      Clock: <Clock clk={clk} />,
    }),
    [myStream, peerStream, myPeerConnection, clk]
  );

  return (
    <Grid container justify="space-between">
      {!start ? (
        <>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            준비가 되었으면 눌러주세요!!!!
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
          <Grid className={classes.bar}>
            Buttons
            <Grid
              container
              xs={12}
              sm={4}
              md={3}
              direction="column"
              alignItems="flex-start"
              spacing={2}
            >
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
          <Grid item xs={12} sm={8} md={6} className={classes.bar}>
            Screen
            <Box>{category["Clock"]}</Box>
            {<Box>{category[content]}</Box>}
          </Grid>
          <Grid item xs={12} sm={12} md={3} className={classes.bar}>
            Chat Window
            <Box>{category["Chat"]}</Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default LectureNote;
