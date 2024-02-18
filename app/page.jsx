"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   const getMoviesData = async () => {
  //     const request = {
  //       url: "https://api.themoviedb.org/3/discover/movie?api_key=e7730054ae930ac9ff732c5bfa076511",
  //       method: "get",
  //     };
  //     const response = await axios(request);
  //     const moviesData = [];
  //     moviesData.push(response.data);
  //     setMovies(moviesData);
  //   };
  //   getMoviesData();
  // }, []);

  return (
    <div className="text-2xl text-center font-bold text-gray-400 mt-32 ">
      This site is under development. Please contact Admin.
    </div>
  );
}
