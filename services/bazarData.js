import axios from "axios";
const Swal = require("sweetalert2");

export const getBazarData = async () => {
  try {
    const request = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/data/bazar`,
      method: "get",
    };

    const response = await axios(request);
    return response.data;
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error.response) {
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage =
        "No response from server. Please check your internet connection.";
    } else {
      errorMessage = error.message;
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
      // footer: "Please try again.",
    });

    return null;
  }
};
