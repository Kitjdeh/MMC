import React, { useEffect, useRef, useState } from "react";
import { Button, Slider, Typography, makeStyles } from "@material-ui/core";
import { CropSquare } from "@material-ui/icons";

let savedStates = [];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    border: "1px solid #555",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  clearButton: {
    margin: theme.spacing(1),
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #555",
    "&:hover": {
      backgroundColor: "#555",
      color: "#fff",
    },
  },
  restoreButton: {
    margin: theme.spacing(1),
    backgroundColor: "#555",
    color: "#fff",
    border: "1px solid #555",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
}));

function updatePicture(type, payload, lectureNoteId, nickName) {
  const msg = { type, payload, lectureNoteId, nickName };
  return JSON.stringify(msg);
}

const LectureGraffiti = ({ lectureNoteId, check, img, pdfimg, setCheck, socket, nickName }) => {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [thickness, setThickness] = useState(5);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    if (check !== 3) {
      setCheck(3);
      socket.send(updatePicture("first2", "", lectureNoteId));
    }
    socket.addEventListener("message", (msg) => {
      const message = JSON.parse(msg.data);
      if (
        message.lectureNoteId === lectureNoteId &&
        ((message.nickName !== nickName && message.type === "picture2") ||
          message.type === "first2")
      ) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.imageSmoothingEnabled = false;
        const Data2JSON = message.payload;
        const Data2Array = JSON.parse(Data2JSON);
        const Data2 = new ImageData(new Uint8ClampedArray(Data2Array), canvas.width, canvas.height);
        context.putImageData(Data2, 0, 0);
        pdfimg.Graffiti = canvas.toDataURL();
      }
    });
  }, []);

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    savedStates.push(context.getImageData(0, 0, canvas.width, canvas.height));
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    setLastX(event.clientX - rect.left);
    setLastY(event.clientY - rect.top);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    const Data1 = context.getImageData(0, 0, canvas.width, canvas.height);
    const Data1Array = Array.from(Data1.data);
    const Data1JSON = JSON.stringify(Data1Array);
    socket.send(updatePicture("picture2", Data1JSON, lectureNoteId, nickName));
    pdfimg.Graffiti = canvas.toDataURL();
  };

  const drawing = (event) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.lineWidth = thickness;
    context.lineCap = "round";
    context.strokeStyle = color;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();
    setLastX(x);
    setLastY(y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const Data1 = context.getImageData(0, 0, canvas.width, canvas.height);
    const Data1Array = Array.from(Data1.data);
    const Data1JSON = JSON.stringify(Data1Array);
    socket.send(updatePicture("picture2", Data1JSON, lectureNoteId, nickName));
  };

  const restore = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    if (savedStates.length > 0) {
      context.putImageData(savedStates.pop(), 0, 0);
    }
    const Data1 = context.getImageData(0, 0, canvas.width, canvas.height);
    const Data1Array = Array.from(Data1.data);
    const Data1JSON = JSON.stringify(Data1Array);
    socket.send(updatePicture("picture2", Data1JSON, lectureNoteId, nickName));
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography>Color:</Typography>
        <CropSquare
          className={classes.button}
          style={{ color: "red" }}
          onClick={() => setColor("red")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "orange" }}
          onClick={() => setColor("orange")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "yellow" }}
          onClick={() => setColor("yellow")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "green" }}
          onClick={() => setColor("green")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "blue" }}
          onClick={() => setColor("blue")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "purple" }}
          onClick={() => setColor("purple")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "pink" }}
          onClick={() => setColor("pink")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "brown" }}
          onClick={() => setColor("brown")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "teal" }}
          onClick={() => setColor("teal")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "navy" }}
          onClick={() => setColor("navy")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "white" }}
          onClick={() => setColor("white")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "gray" }}
          onClick={() => setColor("gray")}
        />
        <CropSquare
          className={classes.button}
          style={{ color: "black" }}
          onClick={() => setColor("black")}
        />
        <Typography>Thickness:</Typography>
        <Slider
          value={thickness}
          min={1}
          max={50}
          step={1}
          onChange={(event, newValue) => setThickness(newValue)}
          valueLabelDisplay="auto"
        />
        <Button variant="contained" className={classes.clearButton} onClick={clear}>
          Clear
        </Button>
        <Button variant="contained" className={classes.restoreButton} onClick={restore}>
          Restore
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}></div>
      <canvas
        ref={canvasRef}
        width={img.width}
        height={1000}
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export default LectureGraffiti;

