import React, { useState, useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const Clock = ({ clk, setTime, userId, studentId }) => {
  const [min, setMin] = useState(padNumber(0, 2));
  const [sec, setSec] = useState(padNumber(0, 2));
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      let time = new Date();
      let seconds =
        time.getHours() * 3600 +
        time.getMinutes() * 60 +
        time.getSeconds() -
        (clk.hour * 3600 + clk.min * 60 + clk.sec);
      if (seconds < 0) seconds += 3600 * 24;
      seconds += clk.ttlTime;
      setMin(padNumber(Math.floor(seconds / 60), 2));
      setSec(padNumber(seconds % 60, 2));
      // 강의 종료 1분전(9분)
      if (padNumber(Math.floor(seconds / 60), 2) === "09" && padNumber(seconds % 60, 2) === "00") {
        setTime(9);
      }
      // 강의 종료(10분)
      if (padNumber(Math.floor(seconds / 60), 2) === "10" && padNumber(seconds % 60, 2) === "00") {
        if (userId === studentId) {
          setTime(11);
        } else {
          setTime(10);
        }
      }
    }, 1000);
    // clean-up 함수 리턴!
    return () => clearInterval(interval.current);
  }, []);

  return (
    <Typography variant="h6" component="div">
      {min} : {sec}
    </Typography>
  );
};

export default Clock;

