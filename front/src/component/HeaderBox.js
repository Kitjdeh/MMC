import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';




{/* <HomeIcon  >{props?.icon}</HomeIcon > */}
const HeaderBox = (props) => {
  // const icon = <Icon sx={{ fontSize: 20 }}>{props?.icon}</Icon>;

  // function HomeIcon(props: SvgIconProps) {
  //   return (
  //     <SvgIcon {...props}>
  //       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  //     </SvgIcon>
  //   );
  // }
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4">{props?.title}</Typography>
      <Typography variant="subtitle1">{props?.number}</Typography>
    </Box>
  );
};

export default HeaderBox;
