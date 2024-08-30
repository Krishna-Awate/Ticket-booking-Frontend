"use client";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

// For custom color
let theme = createTheme();
theme = createTheme(theme, {
  palette: {
    blue: theme.palette.augmentColor({
      color: {
        main: "#0288d1",
      },
      name: "blue",
    }),
    green: theme.palette.augmentColor({
      color: {
        main: "#1D9D3E",
      },
      name: "green",
    }),
  },
});

const useStyles = makeStyles((theme) => ({
  button: {
    height: "40px",
    borderRadius: "8px",
  },
}));

const ButtonWithLoader = ({
  isButtonLoading,
  text,
  buttonColor,
  textSize,
  padding,
}) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <LoadingButton
        className={classes.button}
        style={{
          color: "white",
          fontSize: textSize ? textSize : "",
          padding: padding ? padding : "5px",
        }}
        type=""
        variant="contained"
        color={buttonColor}
        fullWidth
        loading={isButtonLoading}
        loadingPosition="start"
      >
        {text}
      </LoadingButton>
    </ThemeProvider>
  );
};

export default ButtonWithLoader;
