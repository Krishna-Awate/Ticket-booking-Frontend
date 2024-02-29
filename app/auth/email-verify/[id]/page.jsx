"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

import { emailVerify } from "/services/user";

const EmailVerify = () => {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const verifyEmailFun = async () => {
      const verifyEmail = await emailVerify(id);
      if (verifyEmail?.status === "success") {
        router.push("/");
      } else {
        router.push("/auth/login");
      }
    };
    verifyEmailFun();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default EmailVerify;
