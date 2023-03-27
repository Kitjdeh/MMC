import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DepositWarning } from "../assets/DepositWarning";
import { useDispatch, useSelector } from "react-redux";
import { pointAction } from "../redux/actions/pointAction";
import moment from 'moment';

const Bar = styled(Grid)(({ theme }) => ({
  backgroundColor: "#E8DAC3",
  borderRadius: "10px",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  margin: 1,
  fontFamily: "BMHANNAProOTF",
}));
const Barb = styled(Grid)(({ theme }) => ({
  backgroundColor: "#917B56",
  color: "#F9D9CA",
  borderRadius: "10px",
  ...theme.typography.body2,
  padding: 15,
  textAlign: "center",
  margin: 1,
  fontFamily: "BMHANNAProOTF",
}));

const RequestWithdraw = ({userId}) => {
  const [inputs, setInputs] = useState({
    userId:userId,
    depositAndWithdrawl:1,
    amount:0,
    bank: "",
    account: "",
    date: moment().format('YYYY-MM-DD HH:mm:ss')
  })

  const dispatch = useDispatch();
  const submitWithdraw = () => {
    dispatch(pointAction.sendDepositAndWithdrawl(inputs));
  };
  const onChangeHandler = (e) => {
    e.preventDefault();
		const { name, value } = e.target
		const nextInputs = { ...inputs,  [name]: value}
		setInputs(nextInputs);      
  }
  const userInfo = useSelector((state)=>state.userinfo.userinfo);

  return (
    <Bar sx={{ backgroundColor: "#ffffff", minWidth: 100 }}>
      <Bar
        sx={{ borderRadius: "10px",backgroundColor: "#E8DAC3", minWidth: 50 }}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Bar
          sx={{ margin: 0 }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {" "}
          <Bar sx={{ pl: 1}}>
            <Typography sx={{ pl: 1 , fontFamily: "BMHANNAProOTF" }} variant="subtitle1" align="left">
              출금 가능
            </Typography>
          </Bar>
          <Bar sx={{ pl: 1}}>
            <Typography sx={{ pl: 1 ,fontFamily: "BMHANNAProOTF" }} variant="subtitle2" align="right">
              {userInfo.point}
            </Typography>
          </Bar>
        </Bar>
        <Bar
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pl: 1 ,margin: 0 }}
        >
          <Bar>
            <Typography sx={{ pl: 1 ,fontFamily: "BMHANNAProOTF" }}  variant="subtitle2" align="right">
              최소 출금 포인트
            </Typography>
          </Bar>
          <Bar>
          <Typography sx={{ pl: 1 ,fontFamily: "BMHANNAProOTF" }}  variant="subtitle2" align="right">
              10,000
            </Typography>
          </Bar>
        </Bar>
      </Bar>
      <Bar
        sx={{ pl: 1 , mt: "10px", borderRadius: "10px",backgroundColor: "#E8DAC3", minWidth: 50 }}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {" "}
        <Bar
          sx={{ minWidth: 50, margin: 0 }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {" "}
          <Bar>
            <Typography sx={{ pl:1,fontFamily: "BMHANNAProOTF" }} variant="subtitle2" align="left">
              출금계좌
            </Typography>
          </Bar>
          <Bar>
            <TextField
              fullWidth
              type="tel"
              name="account"
              id="account"
              size="small"
              label="계좌번호를 입력해주세요"
              onChange={onChangeHandler}
              value={inputs.account}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </Bar>
        </Bar>
        <Bar
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ margin: 0 }}
        >
          <Bar>
            <Typography sx={{pl:1, fontFamily: "BMHANNAProOTF" }} variant="subtitle2" align="right">
              은행
            </Typography>
          </Bar>
          <Bar>
            <TextField
              fullWidth
              name="bank"
              id="bank"
              label="은행을 입력해주세요"
              size="small"
              onChange={onChangeHandler}
              value={inputs.bank}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </Bar>
        </Bar>
        <Bar
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ margin: 0 }}
        >
          <Bar>
            <Typography sx={{ pl:1,fontFamily: "BMHANNAProOTF" }} variant="subtitle2" align="right">
              출금금액
            </Typography>
          </Bar>
          <Bar>
          <TextField
              fullWidth
              name="amount"
              id="withdraw"
              label="출금 금액을 입력해주세요"
              type="number"
              size="small"
              onChange={onChangeHandler}
              onFocus={e=>e.target.select()}
              value={inputs.amount}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </Bar>
        </Bar>
      </Bar>

      <Button
        sx={{
          backgroundColor: "#f6edff",
          textAlign: "center",
          margin: 2,
          width: 100,
          color: "#F0E4D4" ,
          fontFamily: "BMHANNAProOTF" ,
          backgroundColor: "#D18063",
          mb: 10,
          m: 5,
        }}
        onClick={submitWithdraw}
      >
        출금신청
      </Button>
      <Barb>
        <ul>
          {DepositWarning.map((menu) => (
            <li sx={{ textAlign: "left" }}>{menu}</li>
          ))}
        </ul>
      </Barb>
    </Bar>
  );
};

export default RequestWithdraw;
