import React, { useState, useMemo } from "react";
import { Grid, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LectureQuestion from "../component/LectureQuestion";
import LectureCode from "../component/LectureCode";
import LectureGraffiti from "../component/LectureGraffiti";
import LectureWebRTC from "../component/LectureWebRTC";
import LectureChat from "../component/LectureChat";

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

  const selectpage = (name) => {
    setContent(name);
  };

  const category = useMemo(
    () => ({
      Question: <LectureQuestion check={check} setCheck={setCheck} />,
      Code: <LectureCode />,
      Graffiti: <LectureGraffiti check={check} setCheck={setCheck} />,
      WebRTC: <LectureWebRTC />,
      Chat: <LectureChat />,
    }),
    []
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
