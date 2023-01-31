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

import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setAuthenticate }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
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
  const logout = (event) => {
    handleClose();
    event.preventDefault();
    setAuthenticate(false);
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

            <Grid item>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                알림
              </Link>
            </Grid>

            <Box sx={{ minWidth: 300 }}>
              {setAuthenticate === false ? (
                <Button
                  href="/login"
                  variant="outlined"
                  color="secondary"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Login
                </Button>
              ) : (
                <div>
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
                </div>
              )}
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
