import axios from "axios";
const Swal = require("sweetalert2");

export const userSignUp = async (userData) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/signup`,
      method: "post",
      data: userData,
    };
    const response = await axios(request);
    const newUserData = response.data;
    return newUserData;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};

export const userSignIn = async (userData) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/signin`,
      method: "post",
      data: userData,
    };
    const response = await axios(request);
    const user = response.data;
    return user;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};

export const forgotPassword = async (userData) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/forgotPassword`,
      method: "post",
      data: userData,
    };
    const response = await axios(request);
    const user = response.data;
    return user;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};

export const resetPassword = async (userData, token) => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/resetPassword/${token}`,
      method: "post",
      data: userData,
    };
    const response = await axios(request);
    const user = response.data;
    return user;
  } catch (e) {
    Swal.fire({
      title: "Error!",
      text: e.response.data.message,
      icon: "error",
    });
    return;
  }
};
