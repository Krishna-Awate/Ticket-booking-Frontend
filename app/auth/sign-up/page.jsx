"use client";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Material UI imports
import { Paper, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
const Swal = require("sweetalert2");

import ButtonWithLoader from "/components/Button/ButtonWithLoader";
import VerificationEmail from "/components/VerificationEmail/VerificationEmail";
import { userSignUp } from "/services/user";

//Component
import CustomInput from "/components/Input/CustomInput";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "40px",
    borderRadius: "8px",
  },
}));

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [user, setUser] = useState();

  const classes = useStyles();
  const router = useRouter();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is too Short!")
      .max(50, "Name is too Long!")
      .required("Enter your name"),
    email: Yup.string().email("Enter valid email").required("Enter your email"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Enter your phone number"),
    password: Yup.string()
      .required("Enter password")
      .min(6, "Password is too short - should be 6 chars minimum."),
    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Type your password again"),
  });

  return (
    <>
      {user && !user?.is_email_verified ? (
        <VerificationEmail email={user.email} />
      ) : (
        <Formik
          initialValues={{
            name: "",
            email: "",
            contact: "",
            phone: "",
            password: "",
            re_password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            setIsButtonLoading(true);
            const newUserData = await userSignUp({
              ...values,
              host: window.location.host,
              protocol: window.location.protocol,
            });
            setIsButtonLoading(false);
            if (newUserData.status === "success") {
              setUser(newUserData?.data?.user);
            }
          }}
        >
          <div className="full flex items-center justify-center p-4">
            <Paper className="w-full md:w-1/4 p-6 bg-slate-100" elevation={3}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className="text-2xl font-semibold mb-4">
                      Create Account
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      name="name"
                      type="text"
                      label="Your Name"
                      placeholder="First and Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      name="phone"
                      type="text"
                      label="Mobile number"
                      placeholder="Mobile number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      name="re_password"
                      type="password"
                      label="Re-enter password"
                      placeholder="Re-enter password"
                    />
                  </Grid>

                  <Grid className="mt-2" item xs={12}>
                    <ButtonWithLoader
                      isButtonLoading={isButtonLoading}
                      text="Continue"
                      buttonColor="blue"
                    />
                  </Grid>
                  <Grid className="text-sm" item xs={12}>
                    By creating an account, you agree to Conditions of Use and
                    Privacy Notice.
                  </Grid>
                  <Grid className="text-sm" item xs={12}>
                    Already have an account?
                    <Link
                      style={{ color: "blue", cursor: "pointer" }}
                      href="/auth/login"
                    >
                      Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Paper>
          </div>
        </Formik>
      )}
    </>
  );
};

export default SignUp;
