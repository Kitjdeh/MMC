import React, { useEffect } from "react";
import { Cookies } from 'react-cookie';

const LectureCode = () => {
  let SEC_HTTPS = true;
  let SEC_BASE = "compilers.widgets.sphere-engine.com";
  let SEC = window.SEC || (window.SEC = []);
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src =
      (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "sphere-engine-compilers-jssdk");

  return (
    <div className="App">
      <div
        class="sec-widget"
        data-widget="8becbf3c464b5fa549a85cc3a7ddc6c8"
        data-theme="dark"
      ></div>
    </div>
  );
};

export default LectureCode;
