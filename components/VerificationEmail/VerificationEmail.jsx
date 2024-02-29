"use client";
import React from "react";
// Material UI imports
import { Paper, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const VerificationEmail = () => {
  return (
    <div>
      <div className="full flex items-center justify-center p-4 mt-20">
        <Paper className="w-full md:w-2/6 p-6 bg-slate-100" elevation={3}>
          <div className="flex justify-center mb-4">
            <EmailIcon style={{ fontSize: 50, color: "#0063b0" }} />
          </div>
          <div className="flex justify-center font-sans font-bold mb-4">
            Verify Email
          </div>
          <div className="flex justify-center mb-6 font-sans">
            A verification email has been sent to email address.
          </div>
          <div className="flex justify-center font-sans mb-4">
            Click the link in the email to verify your account
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default VerificationEmail;
