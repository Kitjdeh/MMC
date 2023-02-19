import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import RequestDeposit from "../component/RequestDeposit";
import RequestWithdraw from "../component/RequestWithdraw";
import PointStatement from "../component/PointStatement";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Cookies } from 'react-cookie';
const Point = () => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const category = {
    deposit: <RequestDeposit userId={userId} />,
    withdraw: <RequestWithdraw  userId={userId}/>,
    statement: <PointStatement userId={userId} />,
  };
  const [content, setContent] = useState();
  const selectcomponent = (item) => {
    const { name } = item.target;
    console.log(name);
    setContent(name);
  };
  const Word = styled(Grid)(({ theme }) => ({
    textAlign: "center",
  }));
  return (
    <Box sx={{ minWidth: 400}}>
      <Typography sx={{ m: 6 , fontFamily: "BMHANNAProOTF"}} variant="h3" align="center">
        포인트내역
      </Typography>
      <Grid container direction="row" alignItems="flex-start" margin={2}>
        <Word item xs={4}>
          <Button
            onClick={selectcomponent}
            name="deposit"
            value="main2"
            variant="contained"
            sx={{ fontFamily: "BMHANNAProOTF" , backgroundColor: "#D18063", color: "#F0E4D4" }}
          >
            입금신청
          </Button>
        </Word>
        <Word item xs={4}>
          <Button
            onClick={selectcomponent}
            name="withdraw"
            variant="contained"
            sx={{  fontFamily: "BMHANNAProOTF" , backgroundColor: "#D18063", color: "#F0E4D4" }}
          >
            출금신청
          </Button>
        </Word>
        <Word item xs={4}>
          <Button
            onClick={selectcomponent}
            name="statement"
            variant="contained"
            sx={{  fontFamily: "BMHANNAProOTF" , backgroundColor: "#D18063", color: "#F0E4D4" }}
          >
            입출금내역
          </Button>
        </Word>
      </Grid>
<hr/>
      {content && <Box>{category[content]}</Box>}
    </Box>
  );
};

export default Point;
