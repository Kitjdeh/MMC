import React, { useState } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LectureQuestion from "../component/LectureQuestion";
import LectureCode from "../component/LectureCode";
import LectureGraffiti from "../component/LectureGraffiti";
import LectureWebRTC from "../component/LectureWebRTC";
import LectureChat from "../component/LectureChat";
import jsPDF from "jspdf";
// import { useSelector } from "react-redux";

const useStyles = makeStyles({
  bar: {
    backgroundColor: "#f6edff",
    textAlign: "center",
  },
  word: {
    textAlign: "center",
  },
});

const socket = new WebSocket(`ws://localhost:8000`);
socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

const LectureNote = () => {
  // const nickName = useSelector((state) => state.userinfo.userinfo).nickName;
  // const lectureNoteId = useSelector((state) => state.note.note);
  const lectureNoteId = 2;
  const nickName = "SSAFY";
  const classes = useStyles();
  const [content, setContent] = useState("Question");
  const [check, setCheck] = useState(0);
  const [pdfimg, setPdfimg] = useState({
    Question: "",
    Graffiti: "",
  });
  const img = new Image();
  img.src =
    "https://ssafy-mmc.s3.ap-northeast-2.amazonaws.com/13793120a9ba4c50a4e2bd9f390abf1f.jpg";

  const handleDownload = async () => {
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

  const category = {
    WebRTC: <LectureWebRTC lectureNoteId={lectureNoteId} check={check} setCheck={setCheck} />,
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
  };

  return (
    <Grid container justify="space-between">
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
        {<Box>{category[content]}</Box>}
      </Grid>
      <Grid item xs={2} className={classes.bar}>
        Chat Window
        <Box>{category["Chat"]}</Box>
      </Grid>
      <button onClick={handleDownload}>Download</button>
    </Grid>
  );
};

export default LectureNote;
