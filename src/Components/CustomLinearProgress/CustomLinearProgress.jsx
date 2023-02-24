import React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Grid } from "@mui/material";

const CustomLinearProgress = ({ progress, typeError }) => {
  const CustomBar = styled(LinearProgress)(() => ({
    width: 602,
    "@media(max-Width: 768px)": {
      width: 327,
    },
    height: 4,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      height: 10,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    [`& .${linearProgressClasses.bar}`]: {
      height: 10,
      backgroundColor: typeError ? "red" : "#64EEBC",
    },
  }));

  return (
    <Grid spacing={1} container>
      <Grid xs item>
        <CustomBar variant="determinate" value={progress} />
      </Grid>
    </Grid>
  );
};

export default CustomLinearProgress;
