"use client";
import { Formik } from "formik";
import { useState } from "react";
// Import Material UI
import {
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
const theme = createTheme();

// Firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

// Import Redux related
import { useSelector, useDispatch } from "react-redux";
import { userUpdate } from "../../src/slice/userSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "40px",
    width: "full",
    // [theme.breakpoints.up("md")]: {
    //   backgroundColor: theme.palette.primary.main,
    // },
  },
  paper: {
    padding: "40px",
  },
  button: {
    height: "50px",
  },
}));

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();

  // Configuration for firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBmAjdFmK-go-rgyktg_nf3AQchwHGvrvA",
    authDomain: "ticket-booking-app-ef7b0.firebaseapp.com",
    projectId: "ticket-booking-app-ef7b0",
    storageBucket: "ticket-booking-app-ef7b0.appspot.com",
    messagingSenderId: "871306624835",
    appId: "1:871306624835:web:32a2d5f22a1528f89ff9f6",
    measurementId: "G-GDJFKY434F",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);

  // Google sign in handler
  // const signInWithGoogle = async () => {
  //   try {
  //     console.log("HERE Firebase");
  //     await signInWithPopup(auth, googleProvider);
  //   } catch (err) {
  //     console.error("Error", err);
  //   }
  // };

  // const logOut = async () => {
  //   try {
  //     await signOut(auth);
  //     console.log("HERE LOGOUT");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const signUpHandler = () => {
    setIsSignUp((prev) => !prev);
  };

  return <>Hello</>;
};

export default LoginForm;
