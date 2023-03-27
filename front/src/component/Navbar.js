import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/actions/authAction";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { userinfoAction } from "./../redux/actions/userinfoAction";
import styled from "styled-components";
const MenuName = styled.div`
font-size: 14px;
font-weight: bold;
  margin-left: 5px;
  `;
const MenuInfo = styled.div`
  width: 160px;
  height: 30px;
  display: flex;
  margin: 10px 10px 5px 10px;
  padding: 5px 10px;
  font-size: 12px;
  justify-content: space-between;
  background-color: #e5e5e5;
  `;
const Point = styled.span`
  color: rgba(69, 64, 225, 0.6);
  font-size: 14px;
  `;
const MenuInfoItem = styled(MenuItem)(({ theme }) => ({
  textAlign: "right",
}));
const Navbar = () => {
  const userInfo = useSelector((state) => state.userinfo.userinfo);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const cookie = new Cookies();
    setAuthenticated(cookie.get("userId") !== undefined ? true : false);
    if (authenticated) {
      dispatch(userinfoAction.getUserInfo(userId));
    };
  },[authenticated])
  console.log(authenticated);
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const [anchorEl, setAnchorEl] = React.useState(null);
  let openmypage = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
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
    console.log(userId);
    dispatch(authAction.onLogout(userId));
    setAuthenticated(false)
    navigate("/");
  };
  return (
    <div>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Link variant="button" href="/" sx={{ my: 1, mx: 1.5 }}>
                <img width="60" src="/img/mmclogo.png" alt="logo" />
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="/question"
                underline="none"
                sx={{ my: 1, mx: 1 , color: "#917B56" , fontWeight: '550', fontFamily: "BMHANNAProOTF"}}
                >
                전체질문
              </Link>

                </Grid>
 
          <Grid item xs={6} >

            <Box sx={{ minWidth: 300  ,textAlign: 'right'}}>
              {authenticated === true ? (
                <div>
                  <Grid item>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openmypage}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "mypage-button",
                        }}
                      >
                      <MenuItem>알람이 없습니다.</MenuItem>
                      <MenuItem>알람이 없습니다.</MenuItem>
                    </Menu>
                    <Button
                      id="mypage-button"
                      onClick={handleClick}
                      sx = {{ color: "#917B56" , fontFamily: "BMHANNAProOTF"}}
                      >
                      마이페이지
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openmypage}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "mypage-button",
                      }}
                      >
                      <MenuItem>
                        <Avatar
                          src={userInfo.profileImage}
                          sx={{ width: 32, height: 32 }}
                          />
                          <MenuName>{userInfo?.nickname}</MenuName>
                        </MenuItem>
                        <MenuInfo>
                          <div>포인트</div>
                          <div>
                            <Point>{userInfo?.point}</Point> points
                          </div>
                        </MenuInfo>
                        <MenuItem onClick={goPoint}>포인트 페이지</MenuItem>
                        <MenuItem onClick={goquestion}>내 질문 페이지</MenuItem>
                        <MenuItem onClick={golecture}>내 강의 페이지</MenuItem>
                        <MenuItem onClick={logout}>로그아웃</MenuItem>
                      </Menu>
                    </Grid>
                  </div>
                ) : (
                  <Button
                    href="/login"
                    variant="outlined"
                    color="secondary"
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
