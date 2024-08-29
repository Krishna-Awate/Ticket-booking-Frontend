// components/InactivityHandler.js

"use client"; // This directive ensures the component is rendered on the client side

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userRoleUpdate } from "/src/slice/userSlice";

const InactivityHandler = ({ timeout = 300000 }) => {
  // default 5 minutes
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(userRoleUpdate(""));
        router.push("/auth/login");
      }, timeout);
    };

    const events = ["mousemove", "keydown", "scroll", "click"];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Start the timer on mount

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [router, timeout]);

  return null; // This component does not render any UI
};

export default InactivityHandler;
