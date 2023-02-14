import React, { useState, useRef, useEffect } from "react";

import io from "socket.io-client";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};
const curTime = {
  hour: 0,
  min: 0,
  sec: 0,
  totalTime: 0,
};
let setClock = false;

const setTime = (obj) => {
  curTime.hour = obj.hour;
  curTime.min = obj.min;
  curTime.sec = obj.sec;
  curTime.totalTime = obj.ttlTime;
  console.log(obj);
};

const Clock = () => {
  let stopStatus = true;
  if (!setClock) {
    setClock = true;
    const socket = io("localhost:8001");
    const enterCode = "123";

    socket.on("connect", () => {
      console.log(curTime);
      socket.emit("timerStart", enterCode);
      console.log(curTime.hour, curTime.min, curTime.sec);
      console.log("connected to server");
    });

    socket.on("settingTime", (obj) => {
      stopStatus = false;
      console.log(stopStatus);
      setTime(obj);
      socket.emit("setTime", enterCode);
    });

    socket.on("setTime", (obj) => {
      stopStatus = false;
      setTime(obj);
    });

    socket.on("stopTime", () => {
      stopStatus = true;
    });
  }
  const [min, setMin] = useState(padNumber(0, 2));
  const [sec, setSec] = useState(padNumber(0, 2));
  const interval = useRef(null);

  const stopTimer = () => {
    let time = new Date();
    console.log(stopStatus);
    if (stopStatus) {
      curTime.hour = time.getHours();
      curTime.min = time.getMinutes();
      curTime.sec = time.getSeconds();
      stopStatus = false;
    } else {
      let seconds =
        time.getHours() * 3600 +
        time.getMinutes() * 60 +
        time.getSeconds() -
        (curTime.hour * 3600 + curTime.min * 60 + curTime.sec);
      if (seconds < 0) seconds += 3600 * 24;
      curTime.totalTime += seconds;
      stopStatus = true;
    }
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      let time = new Date();
      if (!stopStatus) {
        let seconds =
          time.getHours() * 3600 +
          time.getMinutes() * 60 +
          time.getSeconds() -
          (curTime.hour * 3600 + curTime.min * 60 + curTime.sec);
        if (seconds < 0) seconds += 3600 * 24;
        seconds += curTime.totalTime;
        //console.log(seconds);
        setMin(padNumber(Math.floor(seconds / 60), 2));
        setSec(padNumber(seconds % 60, 2));
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
