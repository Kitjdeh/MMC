import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect( {hostname : "i8a508.p.ssafy.io", port : 8001});
const enterCode = "12345";
const handleIce = (data) => {
  console.log("sent candidate");
  socket.emit("ice", data.candidate, enterCode);
};

let peerStream;
var myStream;
let isScreen = 0;

let myDataChannel;
var myPeerConnection = new RTCPeerConnection({
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

const handleAddStream = (data) => {
  peerStream = data.stream;
};

const makeConnection = () => {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true,
    })
    .then((stream) => {
      myStream = stream;
      console.log(myStream);
      myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));

      myPeerConnection.addEventListener("icecandidate", handleIce);
      myPeerConnection.addEventListener("addstream", handleAddStream);

      socket.emit("join_room", enterCode);
    });
};
console.log(socket);
socket.on("connect", () => {
  console.log("connected to server");
  makeConnection();
});

socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer();
  console.log("sent the offer");
  myPeerConnection.setLocalDescription(offer);
  socket.emit("offer", offer, enterCode);
});

socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => {
    myDataChannel = event.channel;
    console.log(myDataChannel);
  });

  console.log("received the offer");
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, enterCode);
  console.log("sent the answer");
});

socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
  console.log("received the answer");
});

socket.on("ice", (ice) => {
  console.log("caught candidate");
  myPeerConnection.addIceCandidate(ice);
});

socket.on("setScreen", (num) => {
  isScreen = num;
  console.log(isScreen);
});

const LectureWebRTC = ({ check, setCheck }) => {
  useEffect(() => {
    if (check !== 4) {
      setCheck(4);
    }
  }, []);

  console.log("aaa");
  const myFace = useRef();
  const muteBtn = useRef();
  const cameraBtn = useRef();
  const peersFace = useRef();
  const screenBtn = useRef();
  let muted = true;
  let cameraOff = false;

  let peerData = peerStream;

  const handleAddStream = (data) => {
    getPeersMedia(data.stream);
  };
  myPeerConnection.addEventListener("addstream", handleAddStream);

  const getMedia = () => {
    let video = myFace.current;

    video.srcObject = myStream;

    video.play();
  };

  const getPeersMedia = (data) => {
    let video = peersFace.current;
    video.srcObject = data;
    console.log(data);
    video.play();
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
        peersFace.current.srcObject = stream;
        const videoTrack = stream.getVideoTracks()[0];
        socket.emit("setScreen", enterCode, 1);
        isScreen = 1;
        myPeerConnection
          .getSenders()
          .find((sender) => sender.track.kind === videoTrack.kind)
          .replaceTrack(videoTrack);

        videoTrack.onended = function () {
          let screenTrack = myStream.getVideoTracks()[0];
          isScreen = 0;
          socket.emit("setScreen", enterCode, 0);
          myPeerConnection
            .getSenders()
            .find((sender) => sender.track.kind === screenTrack.kind)
            .replaceTrack(screenTrack);
          stream.getTracks().forEach((track) => track.stop());

          peersFace.current.srcObject = peerStream;
        };
      });
  };

  useEffect(() => {
    getMedia();
  }, [myFace]);

  useEffect(() => {
    getPeersMedia(peerData);
  }, [peersFace]);

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

