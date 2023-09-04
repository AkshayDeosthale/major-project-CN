/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import LeftsideHomepage from "../../Components/HomepageComponent/LeftSideHomepage";
import MainHomepageContent from "../../Components/HomepageComponent/MainHomepageContent";
import { HomePageStructure, HomepageContainer } from "./Homepage.styles";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [location, setLocation] = useState();
  const [ipAddress, setIpAddress] = useState("");
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos: any) {
    const crd: any = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    getLocationInfo(crd.latitude, crd.longitude);
  }
  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIp();
  }, []);

  function getLocationInfo(latitude: string, longitude: string) {
    const APIkey = "awdawd";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log("results:", data.results);
          setLocation(data.results[0].formatted);
        } else {
          console.log("Reverse geolocation request failed.");
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <HomepageContainer>
      <HomePageStructure spacing={2} container>
        <Grid
          sx={{
            display: { xs: "none", md: "inherit" },
            position: "relative",
          }}
          item
          xs={0}
          md={5}
        >
          <LeftsideHomepage />
        </Grid>
        <Grid item xs={12} md={7}>
          <MainHomepageContent />
        </Grid>
      </HomePageStructure>
    </HomepageContainer>
  );
};

export default HomePage;
