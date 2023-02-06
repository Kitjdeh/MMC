import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {DepositWarning} from "../assets/DepositWarning";
import { menuItemClasses } from "@mui/material";
const RequestDeposit = () => {
  const Main = styled(Grid)(({ theme }) => ({
    backgroundColor: "#ffffff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
  }));
  const Bar = styled(Grid)(({ theme }) => ({
    backgroundColor: "#f6edff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    margin: 1,
  }));
  return (
    <Bar sx={{ backgroundColor: "#ffffff", minWidth: 100 }}>
      <Bar
        sx={{ backgroundColor: "#ffffff", minWidth: 50 }}
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
          <Bar>
            <Typography variant="subtitle1" align="left">
              보유포인트
            </Typography>
          </Bar>
          <Bar>
            <Typography variant="subtitle2" align="right">
              33030303
            </Typography>
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
            <Typography variant="subtitle2" align="right">
              충전희망
            </Typography>
          </Bar>
          <Bar>
            <TextField
              fullWidth
              type="number"
              name="point"
              id="point"
              size="small"
              label="원하는 충전포인트를 입력해주세요"
              defaultValue=""
              sx={{ backgroundColor: "#ffffff" }}
            />
          </Bar>
        </Bar>
      </Bar>
      <Bar
        sx={{ backgroundColor: "#ffffff", minWidth: 200 }}
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
            <Typography variant="subtitle2" align="left">
              계좌번호
            </Typography>
          </Bar>
          <Bar>
            <TextField
              fullWidth
              type="number"
              name="account"
              id="account"
              size="small"
              label="계좌번호를 입력해주세요"
              defaultValue=""
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
            <Typography variant="subtitle2" align="right">
              은행
            </Typography>
          </Bar>
          <Bar>
            <TextField
              fullWidth
              name="bank"
              id="bank"
              label="은행을 입력해주세요"
              defaultValue=""
              size="small"
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
            <Typography variant="subtitle2" align="right">
              입금금액
            </Typography>
          </Bar>
          <Bar>
            <Typography variant="subtitle1" align="right">
              1023123000
            </Typography>
          </Bar>
        </Bar>
      </Bar>

      <Button
        sx={{
          backgroundColor: "#f6edff",
          textAlign: "center",
          margin: 2,
          width:100
        }}
      >
        입금신청
      </Button>
      <ul>{DepositWarning.map((menu)=>(
        <li sx={{textAlign: "left"}}>{menu}</li>
      ))}
        
      </ul>
    </Bar>
  );
};

export default RequestDeposit;
