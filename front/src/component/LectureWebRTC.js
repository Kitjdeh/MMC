import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("localhost:8001", { transports: ["websocket"] });

//const socket = io.connect({ hostname: "127.0.0.1", port: 8001 });

const enterCode = "12345";

const LectureWebRTC = ({ myStream, peerStream, myPeerConnection }) => {
  console.log(peerStream);
  console.log("aaa");

  const myFace = useRef();
  const muteBtn = useRef();
  const cameraBtn = useRef();
  const peersFace = useRef();
  const screenBtn = useRef();
  let muted = true;
  let cameraOff = false;

  let peerData = peerStream;
  let isScreen = 0;

  peerData.onaddtrack = function () {
    peersFace.srcObject = peerData;
  };

  peerData.onremovetrack = function () {
    peersFace.srcObject = myStream;
    myFace.srcObject = null;
  };

  socket.on("setScreen", (num) => {
    isScreen = num;
    console.log(isScreen);
  });

  socket.on("goodbye", () => {
    peersFace.current.srcObject = null;
  });

  const getMedia = () => {
    let video = myFace.current;

    video.srcObject = myStream;

    video
      .play()
      .then(() => {
        console.log("alreaady playing");
      })
      .catch((error) => {
        console.log("no video yet");
      });
  };

  const getPeersMedia = () => {
    let video = peersFace.current;

    video.srcObject = peerData;
    console.log(video.srcObject);
    console.log(peerData);

    video
      .play()
      .then(() => {
        console.log("alreaady playing");
      })
      .catch((error) => {
        console.log("no video yet");
      });
  };

  const handleMuteClick = () => {
    if (!muted) {
      muted = true;
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      muteBtn.current.innerText = "Unmute";
    } else {
      muted = false;
      muteBtn.current.innerText = "Mute";
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  };

  const handleCameraClick = () => {
    if (!cameraOff) {
      cameraOff = true;
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });

      myFace.current.srcObject = null;

      cameraBtn.current.innerText = "Turn Camera On";
    } else {
      cameraOff = false;

      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      myFace.current.srcObject = myStream;
      cameraBtn.current.innerText = "Turn Camera Off";
    }
  };

  const handleScreenClick = () => {
    if (isScreen) return;
    navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: "always" },
        audio: { echoCancellation: true, noiseSuppression: true },
      })
      .then((stream) => {
        if (peerData) {
          peersFace.current.srcObject = stream;
          myFace.current.srcObject = peerData;
        }
        const videoTrack = stream.getVideoTracks()[0];
        socket.emit("setScreen", enterCode, 1);
        isScreen = 1;
        // this.props.PeerControl(videoTrack);

        myPeerConnection
          .getSenders()
          .find((sender) => sender.track.kind === videoTrack.kind)
          .replaceTrack(videoTrack);

        videoTrack.onended = function () {
          console.log("hihi");
          let screenTrack = myStream.getVideoTracks()[0];
          isScreen = 0;
          socket.emit("setScreen", enterCode, 0);
          myPeerConnection
            .getSenders()
            .find((sender) => sender.track.kind === screenTrack.kind)
            .replaceTrack(screenTrack);
          stream.getTracks().forEach((track) => track.stop());
          console.log(peerData);
          if (peerData) {
            peersFace.current.srcObject = peerStream;
            myFace.current.srcObject = myStream;
          }
        };
      });
  };

  useEffect(() => {
    getPeersMedia();
  }, [peersFace]);

  useEffect(() => {
    getMedia();
  }, [myFace]);

  return (
    <>
      <button id="mute" onClick={handleMuteClick} ref={muteBtn}>
        Mute
      </button>
      <button id="camera" onClick={handleCameraClick} ref={cameraBtn}>
        Turn Camera Off
      </button>
      <button id="shareScreen" onClick={handleScreenClick} ref={screenBtn}>
        화면 공유
      </button>

      <div id="call">
        <div
          id="myStream"
          style={{ height: 0, overflow: "hidden", paddingBottom: "56.25%", position: "relative" }}
        >
          <video
            id="myFace"
            ref={peersFace}
            autoPlay
            playsInline
            style={{
              width: "100%",
              paddingBottom: "56.25%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></video>

          <video
            ref={myFace}
            autoPlay
            playsInline
            style={{
              width: "240px",
              height: "135px",
              right: "15px",
              bottom: "15px",
              position: "absolute",
            }}
          ></video>
        </div>
      </div>
    </>
  );
};

export default LectureWebRTC;
