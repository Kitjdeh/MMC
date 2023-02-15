import React, { useState, useRef, useEffect } from "react";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const Clock = (clk) => {
  // let stopclk = true;
  // if (!setClock) {
  //   setClock = true;
  //   const socket = io("localhost:8001");
  //   const enterCode = "2";

  //   // socket.on("connect", () => {
  //   //   console.log(curTime);
  //   //   socket.emit("timerStart", enterCode);
  //   //   console.log(curTime.hour, curTime.min, curTime.sec);
  //   //   console.log("connected to server");
  //   // });

  //   socket.on("settingTime", (obj) => {
  //     stopclk = false;
  //     console.log(stopclk);
  //     setTime(obj);
  //     socket.emit("setTime", (lectureNoteId, enterCode));
  //   });

  //   socket.on("setTime", (obj) => {
  //     stopclk = false;
  //     setTime(obj);
  //   });

  //   socket.on("stopTime", () => {
  //     stopclk = true;
  //   });
  // }
  const [min, setMin] = useState(padNumber(0, 2));
  const [sec, setSec] = useState(padNumber(0, 2));
  const interval = useRef(null);

  // const stopTimer = () => {
  //   let time = new Date();
  //   console.log(stopclk);
  //   if (stopclk) {
  //     curTime.hour = time.getHours();
  //     curTime.min = time.getMinutes();
  //     curTime.sec = time.getSeconds();
  //     stopclk = false;
  //   } else {
  //     let seconds =
  //       time.getHours() * 3600 +
  //       time.getMinutes() * 60 +
  //       time.getSeconds() -
  //       (curTime.hour * 3600 + curTime.min * 60 + curTime.sec);
  //     if (seconds < 0) seconds += 3600 * 24;
  //     curTime.totalTime += seconds;
  //     stopclk = true;
  //   }
  // };

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
        (clk.clk.hour * 3600 + clk.clk.min * 60 + clk.clk.sec);
      if (seconds < 0) seconds += 3600 * 24;
      seconds += clk.clk.ttlTime;
      //console.log(seconds);
      setMin(padNumber(Math.floor(seconds / 60), 2));
      setSec(padNumber(seconds % 60, 2));
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
