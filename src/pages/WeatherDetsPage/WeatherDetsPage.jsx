import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WeatherDayCard from "./components/WeatherDayCard";
import { Box, Modal, Typography } from "@mui/material";
import SearchPlaces from "../../common/SearchPlaces";
import dayjs from "dayjs";

import "./WeatherDetsPageStyles.css";

export function WeatherDetsPage() {
  const { lat = 0, lng = 0 } = useParams();

  const [locData, setLocData] = useState(null);
  const [modalData, setModalData] = useState(null);

  const style = {
    bgcolor: "background.paper",
  };

  useEffect(() => {
    // get date information to collect for last 7 days
    const todays_date = dayjs(); // todays date object
    const start_date = todays_date.subtract(7, "day").format("YYYY-MM-DD"); // subtracted 7 days and formatted
    const end_date = todays_date.format("YYYY-MM-DD"); // formatted to required format

    // request made to weatherbit API to collect weather data for specified coordinates and dates
    fetch(
      `https://api.weatherbit.io/v2.0/history/energy?lat=${lat}&lon=${lng}&start_date=${start_date}&end_date=${end_date}&threshold=63&units=I&key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&tp=daily`
    )
      .then((response) => response.json())
      .then((data) => setLocData(data))
      .catch((error) => console.error(error));
  }, [lat, lng]);

  const displayDetails = (item) => {
    setModalData(item);
  };

  const handleClose = () => {
    setModalData(null);
  };

  const ModalDataPair = ({ title, data }) => (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid xs={6}>
        <b>{title}:</b>
      </Grid>
      <Grid xs textAlign="right">
        {data}
      </Grid>
    </Grid>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", margin: "8px" }}>
      <h1>
        {locData
          ? locData?.city_name +
            (locData?.state_code ? ", " + locData?.state_code : "") +
            (locData?.country_code ? ", " + locData?.country_code : "")
          : "Loading..."}
      </h1>
      <ThemeProvider
        theme={createTheme({
          breakpoints: {
            values: {
              laptop: 1024,
              tablet: 640,
              mobile: 0,
              desktop: 1280,
            },
          },
        })}
      >
        <Grid
          container
          spacing={{ mobile: 1, tablet: 2, laptop: 2 }}
          style={{ width: "100vw" }}
          justifyContent="center"
        >
          {locData?.data.map((data, index) => (
            <Grid mobile={6} tablet={4} laptop={3} key={index}>
              <WeatherDayCard dayItem={data} showModal={() => displayDetails(data)} />
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>

      <Modal
        open={!!modalData}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <h3 style={{ padding: "4px", textAlign: "center", width: "100%" }}>Weather details</h3>
          <ModalDataPair title="Day" data={dayjs(modalData?.date).format("ddd, DD/MM")} />
          <ModalDataPair title="Avg temp" data={(modalData?.temp || "-") + `° C`} />
          <ModalDataPair title="Avg wet bulb temp" data={(modalData?.temp_wetbulb || "-") + `° C`} />
          <ModalDataPair title="Wind Speed" data={(modalData?.wind_spd || "-") + "m/s"} />
          <ModalDataPair title="Wind Direction" data={(modalData?.wind_dir || "-") + "°"} />
          {modalData?.dewpt ? <ModalDataPair title="Avg dew point" data={(modalData?.dewpt || "-") + "° C"} /> : null}
          {modalData?.clouds ? (
            <ModalDataPair title="Avg cloud coverage" data={(modalData?.clouds || "-") + "%"} />
          ) : null}
          {modalData?.precip ? <ModalDataPair title="Avg prec." data={(modalData?.precip || "-") + "mm"} /> : null}
          {modalData?.snow ? (
            <ModalDataPair title="Accumulated snowfall" data={(modalData?.snow || "-") + "mm"} />
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
