"use client";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const Swal = require("sweetalert2");
import Link from "next/link";

// Material UI imports
import { Paper, Grid, Button } from "@mui/material";
import { Input, Divider } from "@mui/joy";

import { makeStyles } from "@mui/styles";

import { userSignIn } from "../../../services/user";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "40px",
    borderRadius: "8px",
  },
}));

const Login = () => {
  const classes = useStyles();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Enter your email"),
    password: Yup.string().required("Enter password"),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          actions.resetForm();
          const user = await userSignIn(values);
          // localStorage.setItem("user", JSON.stringify(token));
          console.log("user", user);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <div className="full flex items-center justify-center mt-10 p-4">
            <Paper
              className="w-full md:w-1/4 md:mt-6 p-6 bg-slate-100"
              elevation={3}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className="text-2xl font-semibold mb-2">Sign in</div>
                  </Grid>
                  <Grid item xs={12}>
                    <label className="block uppercase text-gray-500 text-xs font-bold mb-2">
                      Email address
                    </label>
                    <div>
                      <Input
                        name="email"
                        placeholder="Email address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <ErrorMessage
                        className="text-sm ml-1 mt-1"
                        style={{ color: "red" }}
                        name="email"
                        component="div"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <label className="block uppercase text-gray-500 text-xs font-bold mb-2">
                      Password
                    </label>

                    <div>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <ErrorMessage
                        className="text-sm ml-1 mt-1"
                        style={{ color: "red" }}
                        name="password"
                        component="div"
                      />
                    </div>
                  </Grid>

                  <Grid className="mt-2" item xs={12}>
                    <Button
                      className={classes.button}
                      type=""
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Log in
                    </Button>
                  </Grid>
                  <Grid className="text-center text-sm" item xs={12}>
                    <Link
                      style={{ color: "blue", cursor: "pointer" }}
                      href="/auth/forgot-password"
                    >
                      Forgot password{" "}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider style={{ marginTop: "15px" }}>
                      Don't have an account?
                    </Divider>
                  </Grid>
                  <Grid className="mb-4" item xs={12}>
                    <Link href="/auth/sign-up">
                      <Button
                        className={classes.button}
                        style={{ backgroundColor: "#228B22" }}
                        type=""
                        variant="contained"
                        color="success"
                        fullWidth
                      >
                        Create your account
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Paper>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
