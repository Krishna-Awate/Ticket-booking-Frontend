"use client";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const Swal = require("sweetalert2");
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

// Material UI imports
import { Paper, Grid, Button } from "@mui/material";
import { Input } from "@mui/joy";
import { makeStyles } from "@mui/styles";

import { resetPassword } from "/services/user";
import ButtonWithLoader from "/components/Button/ButtonWithLoader";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "40px",
    borderRadius: "15px",
    // backgroundColor: "green",
    // color: "white",
  },
}));

const ResetPassword = () => {
  const [isButtonLoading, setisButtonLoading] = useState(false);

  const router = useRouter();
  const classes = useStyles();
  const { id } = useParams();

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .required("Enter password")
      .min(6, "Password is too short - should be 6 chars minimum."),
    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Type your password again"),
  });

  return (
    <>
      <Formik
        initialValues={{ password: "", re_password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          setisButtonLoading(true);
          const user = await resetPassword(values, id);
          setisButtonLoading(false);
          actions.resetForm();
          if (user.status === "success") {
            Swal.fire({
              title: "Success",
              text: "Password changed successfully.",
              icon: "success",
            });
            router.push("/auth/login");
          }
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <div className="full flex items-center justify-center mt-4 p-4">
            <Paper
              className="w-full md:w-1/4 md:mt-20 p-6 bg-slate-100"
              elevation={3}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className=" text-center text-xl font-semibold mb-2 pt-6">
                      Set your password
                    </div>
                    <div className="mt-6 mb-4 text-sm">
                      Hello user, please set your new password.
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      New password
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

                  <Grid item xs={12}>
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      Re-enter password
                    </label>
                    <div>
                      <Input
                        placeholder="Re-enter password"
                        type="password"
                        name="re_password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.re_password}
                      />
                      <ErrorMessage
                        className="text-sm ml-1 mt-1"
                        style={{ color: "red" }}
                        name="re_password"
                        component="div"
                      />
                    </div>
                  </Grid>

                  <Grid className="mt-4 mb-4 pb-6" item xs={12}>
                    <ButtonWithLoader
                      isButtonLoading={isButtonLoading}
                      text="Reset Password"
                      buttonColor="green"
                    />
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

export default ResetPassword;
