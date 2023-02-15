import React, { useState, useRef, useEffect } from "react";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const Clock = ({ clk, setTime, userId, studentId, teacherId }) => {
  const [min, setMin] = useState(padNumber(0, 2));
  const [sec, setSec] = useState(padNumber(0, 2));
  const interval = useRef(null);

  useEffect(() => {
    console.log(clk);
    console.log("에이 거짓말");
    console.log(clk.hour);
    interval.current = setInterval(() => {
      let time = new Date();
      // if (!stopclk) {
      let seconds =
        time.getHours() * 3600 +
        time.getMinutes() * 60 +
        time.getSeconds() -
        (clk.hour * 3600 + clk.min * 60 + clk.sec);
      if (seconds < 0) seconds += 3600 * 24;
      seconds += clk.ttlTime;
      //console.log(seconds);
      setMin(padNumber(Math.floor(seconds / 60), 2));
      setSec(padNumber(seconds % 60, 2));
      if (padNumber(seconds % 60, 2) === "40") {
        setTime(9);
      }
      if (padNumber(seconds % 60, 2) === "50") {
        // padNumber(Math.floor(seconds / 60), 2) === "00" &&
        console.log("1분");
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
    <div>
      {min} : {sec}
    </div>
  );
};

export default Clock;
