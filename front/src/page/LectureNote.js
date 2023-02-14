import React, { useState, useMemo } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LectureQuestion from "../component/LectureQuestion";
import LectureCode from "../component/LectureCode";
import LectureGraffiti from "../component/LectureGraffiti";
import LectureWebRTC from "../component/LectureWebRTC";
import LectureChat from "../component/LectureChat";
import Clock from "../component/Clock";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("localhost:8001", { transports: ["websocket"] });
//const socket = io.connect({ hostname: "127.0.0.1", port: 8001 });

const enterCode = "12345";

// let isConnect = false;
const myPeerConnection = new RTCPeerConnection({
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
});

const useStyles = makeStyles({
  bar: {
    backgroundColor: "#f6edff",
    textAlign: "center",
  },
  word: {
    textAlign: "center",
  },
});

const LectureNote = () => {
  const classes = useStyles();
  const [content, setContent] = useState("Question");
  const [check, setCheck] = useState(0);
  const [peerStream, setPeerStream] = useState();

  const [myStream, setMyStream] = useState();

  // let myStream;
  const selectpage = (name) => {
    setContent(name);
  };

  const handleAddStream = (data) => {
    setPeerStream(data.stream);
  };
  const handleIce = (data) => {
    console.log("sent candidate");
    socket.emit("ice", data.candidate, enterCode);
  };

  // if (!isConnect) {
  //   isConnect = true;

  //   navigator.mediaDevices
  //     .getUserMedia({
  //       audio: false,
  //       video: true,
  //     })
  //     .then((stream) => {
  //       //
  //       setMyStream(stream);
  //       console.log(stream);
  //       stream.getTracks().forEach((track) => myPeerConnection.addTrack(track, stream));

  //       console.log(myPeerConnection);
  //     });

  //   myPeerConnection.addEventListener("icecandidate", handleIce);
  //   myPeerConnection.addEventListener("addstream", handleAddStream);
  // }

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

    socket.on("connect", () => {
      console.log("connected to server");

      socket.emit("join_room", enterCode);
    });

    socket.on("welcome", async () => {
      const offer = await myPeerConnection.createOffer();
      console.log("sent the offer");
      myPeerConnection.setLocalDescription(offer);
      socket.emit("offer", offer, enterCode);
    });

    socket.on("offer", async (offer) => {
      console.log("received the offer");
      console.log(offer);
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, enterCode);
      console.log("sent the answer");
    });

    socket.on("answer", (answer) => {
      console.log(answer);
      myPeerConnection.setRemoteDescription(answer);
      console.log("received the answer");
    });

    socket.on("ice", (ice) => {
      console.log("caught candidate");
      console.log(ice);
      myPeerConnection.addIceCandidate(ice);
    });

    socket.on("goodbye", () => {
      // myPeerConnection.getSenders().map((sender) => sender.replaceTrack(null));
      // console.log(myPeerConnection.getSenders().map((sender) => sender.track));

      // setPeerStream(null);
      console.log("byebye");
    });

    return () => {
      socket.off("connect");
      myPeerConnection.removeEventListener("icecandidate", handleIce);
      myPeerConnection.removeEventListener("addstream", handleAddStream);
    };
  }, []);

  const category = useMemo(
    () => ({
      Question: <LectureQuestion check={check} setCheck={setCheck} />,
      Code: <LectureCode />,
      Graffiti: <LectureGraffiti check={check} setCheck={setCheck} />,
      WebRTC: (
        <LectureWebRTC
          myStream={myStream}
          peerStream={peerStream}
          myPeerConnection={myPeerConnection}
        />
      ),
      Chat: <LectureChat />,
    }),
    [myStream, peerStream, myPeerConnection]
  );

  return (
    <Grid container justify="space-between">
      <Grid item xs={1} className={classes.bar}>
        Buttons
        <Grid container direction="column" alignItems="flex-start" spacing={2}>
          <Grid item xs={4} className={classes.word}>
            <Button onClick={() => selectpage("Question")} variant="contained" color="primary">
              Question
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.word}>
            <Button onClick={() => selectpage("Code")} variant="contained" color="primary">
              Code
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.word}>
            <Button onClick={() => selectpage("Graffiti")} variant="contained" color="primary">
              Graffiti
            </Button>
          </Grid>
          <Grid item xs={4} className={classes.word}>
            <Button onClick={() => selectpage("WebRTC")} variant="contained" color="primary">
              WebRTC
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.bar}>
        Screen
        <Clock></Clock>
        {content && <Box>{category[content]}</Box>}
      </Grid>
      <Grid item xs={2} className={classes.bar}>
        Chat Window
        <Box>{category["Chat"]}</Box>
      </Grid>
    </Grid>
  );
};

export default LectureNote;
