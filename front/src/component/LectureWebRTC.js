import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
//const socket = io.connect({ hostname: "127.0.0.1", port: 8001 });

const LectureWebRTC = ({
  myStream,
  peerStream,
  myPeerConnection,
  isScreen,
  handleScreen,
  check,
  setCheck,
}) => {
  console.log(peerStream);
  console.log("aaa");
  console.log(myPeerConnection);

  //const //myFace = useRef();

  const cameraBtn = useRef();
  const peersFace = useRef();
  const screenBtn = useRef();

  const [screenCtr, setScreenCtr] = useState(isScreen);

  let cameraOff = false;
  let peerPlaying = false;
  let mePlaying = false;

  let peerData = peerStream;

  // peerData.onaddtrack = function () {
  //   peersFace.srcObject = peerData;
  // };

  // peerData.onremovetrack = function () {
  //   peersFace.srcObject = myStream;
  //   //myFace.srcObject = null;
  // };

  // socket.on("goodbye", () => {
  //   peersFace.current.srcObject = null;
  // });

  // const getMedia = () => {
  //   let video = //myFace.current;
  //   if (mePlaying) {
  //     mePlaying = false;
  //     video.pause();
  //   }
  //   video.srcObject = myStream;

  //   video
  //     .play()
  //     .then(() => {
  //       mePlaying = true;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getPeersMedia = () => {
    let video = peersFace.current;
    if (peerPlaying) {
      video.pause();
      peerPlaying = false;
    }
    console.log(peerData);
    video.srcObject = peerData;
    console.log(video.srcObject);
    console.log(peerData);

    video
      .play()
      .then(() => {
        peerPlaying = true;
        console.log("alreaady playing");
      })
      .catch((error) => {
        console.log("no video yet");
      });
  };

  const handleCameraClick = () => {
    if (!cameraOff) {
      cameraOff = true;
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });

      //myFace.current.srcObject = null;

      cameraBtn.current.innerText = "Turn Camera On";
    } else {
      cameraOff = false;

      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      //myFace.current.srcObject = myStream;
      cameraBtn.current.innerText = "Turn Camera Off";
    }
  };

  const handleScreenClick = () => {
    console.log(screenCtr, isScreen);
    if (screenCtr || isScreen) return;
    navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: "always" },
        //audio: { echoCancellation: true, noiseSuppression: true },
      })
      .then((stream) => {
        if (peerData) {
          peersFace.current.srcObject = stream;
          //myFace.current.srcObject = peerData;
        }
        const videoTrack = stream.getVideoTracks()[0];
        console.log("send 1");

        setScreenCtr(1);
        handleScreen(1);
        // this.props.PeerControl(videoTrack);

        myPeerConnection
          .getSenders()
          .find((sender) => sender.track.kind === videoTrack.kind)
          .replaceTrack(videoTrack);

        videoTrack.onended = function () {
          console.log("hihi");
          let screenTrack = myStream.getVideoTracks()[0];
          setScreenCtr(0);
          handleScreen(0);

          myPeerConnection
            .getSenders()
            .find((sender) => sender.track.kind === screenTrack.kind)
            .replaceTrack(screenTrack);
          stream.getTracks().forEach((track) => track.stop());
          console.log(peerData);
          if (peerData) {
            peersFace.current.srcObject = peerStream;
            //myFace.current.srcObject = myStream;
          }
        };
      });
  };

  useEffect(() => {
    getPeersMedia();
  }, [peersFace]);

  useEffect(() => {
    //getMedia();
  }, []);

  useEffect(() => {
    if (check !== 4) {
      setCheck(4);
    }
  }, []);

  return (
    <>
      <Button variant="contained" id="camera" onClick={handleCameraClick} ref={cameraBtn}>
        카메라 공유
      </Button>

      <Button variant="contained" id="shareScreen" onClick={handleScreenClick} ref={screenBtn}>
        화면 공유
      </Button>

      <div id="call">
        <div
          id="myStream"
          style={{ height: 0, overflow: "hidden", paddingBottom: "56.25%", position: "relative" }}
        >
          <video
            id="//myFace"
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
            // ref={//myFace}
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

