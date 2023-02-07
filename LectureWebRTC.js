import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("localhost:8000");
const enterCode = "12345";

const handleIce = (data) => {
  console.log("sent candidate");
  socket.emit("ice", data.candidate, enterCode);
};

let peerStream;

var myStream;
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
  console.log("상대방 stream", peerStream);
  console.log("내 stream", myStream);
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
  //console.log(ice);
  myPeerConnection.addIceCandidate(ice);
});

const LectureWebRTC = () => {
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
    console.log("상대방 stream", peerData);
    console.log("내 stream", myStream);
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

  //   const editPeersMedia = () => {
  //     let video = peersFace.current;
  //       console.log(peerData);
  //     video.srcObject = peerData;
  //     video.play();
  //   };

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

      cameraBtn.current.innerText = "Turn Camera On";
    } else {
      cameraOff = false;

      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });

      cameraBtn.current.innerText = "Turn Camera Off";
    }
  };

  const handleScreenClick = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: "always" },
        audio: { echoCancellation: true, noiseSuppression: true },
      })
      .then((stream) => {
        myFace.current.srcObject = stream;
        const videoTrack = stream.getVideoTracks()[0];
        myPeerConnection
          .getSenders()
          .find((sender) => sender.track.kind === videoTrack.kind)
          .replaceTrack(videoTrack);
        videoTrack.onended = function () {
          const screenTrack = myStream.getVideoTracks()[0];
          myPeerConnection
            .getSenders()
            .find((sender) => sender.track.kind === screenTrack.kind)
            .replaceTrack(screenTrack);
          stream.getTracks().forEach((track) => track.stop());
          myFace.current.srcObject = myStream;
        };
      });

    //   myFace.current.srcObject = screenCapture;

    //   if (myPeerConnection) {
    //     const videoTrack = screenCapture.getVideoTracks()[0];
    //     console.log(videoTrack);
    //     const videoSender = myPeerConnection
    //       .getSenders()
    //       .find((sender) => sender.track.kind === "video");
    //     videoSender.replaceTrack(videoTrack);
    //   }
  };

  useEffect(() => {
    getMedia();
    console.log("공유");
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
            ref={myFace}
            autoPlay
            playsInline
            style={{
              width: "100%",
              paddingBottom: "56.25%",
              position: "absolute",
              top: "-21.8%",
              left: 0,
            }}
          ></video>
          <video
            ref={peersFace}
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
        {/* <div id="peersStream">

        </div> */}
      </div>
    </>
  );
};

export default LectureWebRTC;
