"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
const Swal = require("sweetalert2");
import { useRouter } from "next/navigation";

// Componentes
import ButtonWithLoader from "/components/Button/ButtonWithLoader";
import WhatsAppShareButton from "/components/whatsAppShare";

// API
import { getBazarData } from "/services/bazarData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  border: `1px solid #bdbbbb`,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Home() {
  const [dayBazar, setDayBazar] = useState();
  const [nightBazar, setNightBazar] = useState();
  const [token, setToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (!token) {
      Swal.fire({
        title: "Error!",
        text: "You are not logged in. Please login to with your credentials.",
        icon: "error",
      });
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    const getBazars = async () => {
      const bazar = await getBazarData();
      setDayBazar(bazar?.data?.day);
      setNightBazar(bazar?.data?.night);
    };
    getBazars();
  }, []);

  return (
    <>
      {token && (
        <div className="md:flex md:justify-center md:items-center">
          <div className="text-2xl font-bold text-gray-400 md:w-1/2 mt-6">
            <div className="text-center text-white uppercase bg-fuchsia-700 text-base p-1">
              Matka result live update
            </div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={0}>
                <Grid item xs={6} md={6}>
                  <div className="bg-orange-400 text-black font-semibold text-base text-center">
                    Day Market
                  </div>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                      {dayBazar?.map((data, i) => {
                        let backgroundColor;
                        const isMain = data?.name === "kalyan";
                        backgroundColor = isMain
                          ? "#fdf73b"
                          : i % 2 === 0
                          ? "#e7e6d2"
                          : "#fff";

                        return (
                          <Item
                            key={i}
                            style={{ backgroundColor: backgroundColor }}
                          >
                            <div className="bg-red-500 p-1 text-white rounded-md mt-1">
                              {data?.working}
                            </div>
                            <div className="font-semibold mt-2 uppercase">
                              {data?.name}
                            </div>
                            <div className="font-semibold mt-2">
                              {data?.code}
                            </div>
                            <div className="mt-2">
                              <span className="font-semibold text-blue-700">
                                {data?.timeFrom}
                              </span>{" "}
                              to{" "}
                              <span className="font-semibold text-blue-700">
                                {data?.timeTo}
                              </span>
                            </div>
                            <div>
                              <WhatsAppShareButton message={"Hello"} />
                            </div>
                            <div className="space-y-1 md:space-x-2 md:flex mt-2 md:justify-center">
                              <div className="bg-cyan-400 px-1 py-2 rounded-sm font-semibold flex items-center justify-center">
                                Weekwise
                              </div>
                              <div className="bg-cyan-400 px-1 py-2 rounded-sm font-semibold flex items-center justify-center">
                                Pattern trick
                              </div>
                              <div className="bg-cyan-400 px-1 py-2 rounded-sm font-semibold flex items-center justify-center">
                                OTC ki chal
                              </div>
                            </div>
                          </Item>
                        );
                      })}
                    </Grid>
                    <Grid item xs={12} md={12}></Grid>
                    <Grid item xs={12} md={12}></Grid>
                    <Grid item xs={12} md={12}></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} md={6}>
                  <div className="bg-orange-400 text-black font-semibold text-base text-center">
                    Night Market
                  </div>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                      {nightBazar?.map((data, i) => {
                        // Determine the background color based on the name\
                        let backgroundColor;
                        const isMain = data?.name === "main bazar";
                        backgroundColor = isMain
                          ? "#fdf73b"
                          : i % 2 === 0
                          ? "#e7e6d2"
                          : "#fff";

                        return (
                          <Item
                            key={i}
                            style={{ backgroundColor: backgroundColor }}
                          >
                            <div className="bg-red-500 p-1 text-white rounded-md mt-1">
                              {data?.working}
                            </div>
                            <div className="font-semibold mt-2 uppercase">
                              {data?.name}
                            </div>
                            <div className="font-semibold mt-2">
                              {data?.code}
                            </div>
                            <div className="mt-2">
                              <span className="font-semibold text-blue-700">
                                {data?.timeFrom}
                              </span>{" "}
                              to{" "}
                              <span className="font-semibold text-blue-700">
                                {data?.timeTo}
                              </span>
                            </div>
                            <div>
                              <WhatsAppShareButton />
                            </div>
                            <div className="space-y-1 md:space-x-2 md:flex mt-2 md:justify-center">
                              <div className="bg-cyan-400 px-1 py-2 rounded-sm font-semibold flex items-center justify-center">
                                Weekwise
                              </div>
                              <div className="bg-cyan-400 px-1 py-2 rounded-sm font-semibold flex items-center justify-center">
                                Pattern trick
                              </div>
                              <div className="bg-cyan-400 px-1 py-2 rounded-sm font-semibold flex items-center justify-center">
                                OTC ki chal
                              </div>
                            </div>
                          </Item>
                        );
                      })}
                    </Grid>
                    <Grid item xs={12} md={12}></Grid>
                    <Grid item xs={12} md={12}></Grid>
                    <Grid item xs={12} md={12}></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      )}
    </>
  );
}
