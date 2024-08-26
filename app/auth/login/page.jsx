"use client";
import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const Swal = require("sweetalert2");
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userUpdate } from "/src/slice/userSlice";

// Material UI imports
import { Paper, Grid, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Input, Divider } from "@mui/joy";
import { makeStyles } from "@mui/styles";

import { userSignIn } from "../../../services/user";
import VerificationEmail from "/components/VerificationEmail/VerificationEmail";
import ButtonWithLoader from "/components/Button/ButtonWithLoader";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "40px",
    borderRadius: "8px",
  },
}));

const Login = () => {
  const [isButtonLoading, setisButtonLoading] = useState(false);
  const [user, setUser] = useState("");

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Enter your email"),
    password: Yup.string().required("Enter password"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleLogin = () => {
    dispatch(userUpdate(true));
  };

  return (
    <>
      {user && !user?.is_email_verified ? (
        <VerificationEmail email={user.email} />
      ) : (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            setisButtonLoading(true);
            const user = await userSignIn(values);
            setisButtonLoading(false);
            if (user.status === "success") {
              setUser(user?.data?.user);
              if (user?.data?.user?.is_email_verified) {
                localStorage.setItem("token", user?.token);
                localStorage.setItem("user", JSON.stringify(user?.data?.user));
                handleLogin();
                router.push("/");
              }
            }
            console.log("Cookies", Cookies.get("jwt"));
            // localStorage.setItem("user", JSON.stringify(token));
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
                      <ButtonWithLoader
                        isButtonLoading={isButtonLoading}
                        text="Log in"
                        buttonColor="blue"
                      />
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
                        Do not have an account?
                      </Divider>
                    </Grid>
                    <Grid className="mb-4" item xs={12}>
                      <Link href="/auth/sign-up">
                        <ButtonWithLoader
                          text="create your account"
                          buttonColor="green"
                        />
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              </Paper>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default Login;
