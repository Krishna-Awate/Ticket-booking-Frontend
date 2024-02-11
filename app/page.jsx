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
  //     console.log("response", response);
  //     const moviesData = [];
  //     moviesData.push(response.data);
  //     setMovies(moviesData);
  //   };
  //   getMoviesData();
  // }, []);

  console.log("movies", movies);

  return <div>Hello</div>;
}
