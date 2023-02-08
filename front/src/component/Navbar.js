import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/actions/authAction";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { getCookieToken } from "../storage/Cookie";
import alarm from "./alarm";
const Navbar = () => {
  // const authcookie = getCookieToken();
  // const authenticated = useSelector((state) => state.authToken.authenticated);
  // const userId = useSelector((state) => state.authToken.userId);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchore2, setAnchorE2] = React.useState(null);
  const openalarm = Boolean(anchore2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickAlarmHandler = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const onClickAlarmClose = () => {
    setAnchorE2(null);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goPoint = () => {
    handleClose();
    navigate(`/mypage/point`);
  };
  const goquestion = () => {
    handleClose();
    navigate(`/mypage/question`);
  };
  const golecture = () => {
    handleClose();
    navigate(`/mypage/lecture`);
  };
  const logout = () => {
    handleClose();
    // console.log("엑세스토큰,유저아이디 호출", authenticated, userId);
    // dispatch(authAction.onLogout(userId));
    navigate("/");
  };

  return (
    <div>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#f6edff",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Link variant="button" href="/" sx={{ my: 1, mx: 1.5 }}>
              <img width="60" src="/img/mmclogo.png" alt="logo" />
            </Link>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              MMT
              <Link
                variant="button"
                color="text.primary"
                href="/question"
                sx={{ my: 1, mx: 1.5 }}
              >
                전체질문
              </Link>
            </Typography>

            <Box sx={{ minWidth: 300 }}>
              {/* {authenticated === true ? ( */}
                <div>
                  <Grid item>
                    <Button
                      id="alarm-button"
                      aria-controls={openalarm ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openalarm ? "true" : undefined}
                      onClick={onClickAlarmHandler}
                      open={openalarm}
                      onClose={onClickAlarmClose}
                    >
                      알람
                      <Menu
                        id="alarm-menu"
                        anchorE2={anchore2}
                        open={openalarm}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "alarm-menu",
                        }}
                      >
                        <MenuItem>알람이 없습니다.</MenuItem>
                        <MenuItem>알람이 없습니다.</MenuItem>
                      </Menu>
                    </Button>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      마이페이지
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={goPoint}>포인트 페이지</MenuItem>
                      <MenuItem onClick={goquestion}>내 질문 페이지</MenuItem>
                      <MenuItem onClick={golecture}>내 강의 페이지</MenuItem>
                      <MenuItem onClick={logout}>로그아웃</MenuItem>
                    </Menu>
                  </Grid>
                </div>
              {/* ) : ( */}
                <Button
                  href="/login"
                  variant="outlined"
                  color="secondary"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Login
                </Button>
              {/* )} */}
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
