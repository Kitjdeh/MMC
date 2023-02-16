import React from "react";
import Box from "@mui/material/Box";
import Main from "../page/Main";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { styled } from "@mui/material/styles";
const Mainbox = styled(Box)(({ theme }) => ({
    backgroundImage: "/img/main3.png",
    textAlign: "center",
}));

const mainbox = {
    hegith: 10055,
};
const MainBackground = () => {
    return (
        <Mainbox>
            <Box sx={{ mb: -15, minWidth: 300, ml: -30, mr: -30 }} >
                <img src=" /img/mainbackground.png" width={1300} height={400}/>
            </Box>
            <Main />
        </Mainbox>
    );
};

export default MainBackground;