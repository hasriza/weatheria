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

  const [modalData, setModalData] = useState(null);

  const style = {
    bgcolor: "background.paper",
  };

  const dummy = {
    city_id: 4299276,
    city_name: "Louisville",
    count: 7,
    country_code: "US",
    data: [
      {
        cdd: 0,
        clouds: 14,
        date: "2024-03-14",
        dewpt: 48,
        hdd: 0,
        max_wind_dir: 150,
        max_wind_spd: 5.8,
        precip: 0,
        revision_status: "interim",
        rh: 57,
        snow: 0,
        sun_hours: 5.7,
        t_dhi: 1033.7,
        t_dni: 8453.3,
        t_ghi: 5658.9,
        t_solar_rad: 0,
        temp: 63.5,
        temp_wetbulb: 55.2,
        timestamp_local: null,
        timestamp_utc: null,
        wind_dir: 140,
        wind_spd: 5.8,
      },
      {
        cdd: 0,
        clouds: null,
        date: "2024-03-15",
        dewpt: null,
        hdd: 0,
        max_wind_dir: null,
        max_wind_spd: null,
        precip: 0,
        revision_status: "interim",
        rh: null,
        snow: null,
        sun_hours: 5.7,
        t_dhi: 1040.5,
        t_dni: 8496.4,
        t_ghi: 5712.5,
        t_solar_rad: null,
        temp: null,
        temp_wetbulb: null,
        timestamp_local: null,
        timestamp_utc: null,
        wind_dir: null,
        wind_spd: null,
      },
      {
        cdd: 0,
        clouds: null,
        date: "2024-03-16",
        dewpt: null,
        hdd: 0,
        max_wind_dir: null,
        max_wind_spd: null,
        precip: 0,
        revision_status: "interim",
        rh: null,
        snow: null,
        sun_hours: 5.8,
        t_dhi: 1047,
        t_dni: 8542,
        t_ghi: 5766.1,
        t_solar_rad: null,
        temp: null,
        temp_wetbulb: null,
        timestamp_local: null,
        timestamp_utc: null,
        wind_dir: null,
        wind_spd: null,
      },
      {
        cdd: 0,
        clouds: null,
        date: "2024-03-17",
        dewpt: null,
        hdd: 0,
        max_wind_dir: null,
        max_wind_spd: null,
        precip: 0,
        revision_status: "interim",
        rh: null,
        snow: null,
        sun_hours: 5.8,
        t_dhi: 1053.4,
        t_dni: 8588.5,
        t_ghi: 5819.8,
        t_solar_rad: null,
        temp: null,
        temp_wetbulb: null,
        timestamp_local: null,
        timestamp_utc: null,
        wind_dir: null,
        wind_spd: null,
      },
      {
        cdd: 0,
        clouds: null,
        date: "2024-03-18",
        dewpt: null,
        hdd: 0,
        max_wind_dir: null,
        max_wind_spd: null,
        precip: 0,
        revision_status: "interim",
        rh: null,
        snow: null,
        sun_hours: 5.9,
        t_dhi: 1059.6,
        t_dni: 8635.1,
        t_ghi: 5873.4,
        t_solar_rad: null,
        temp: null,
        temp_wetbulb: null,
        timestamp_local: null,
        timestamp_utc: null,
        wind_dir: null,
        wind_spd: null,
      },
      {
        cdd: 0,
        clouds: null,
        date: "2024-03-19",
        dewpt: null,
        hdd: 0,
        max_wind_dir: null,
        max_wind_spd: null,
        precip: 0,
        revision_status: "interim",
        rh: null,
        snow: null,
        sun_hours: 5.9,
        t_dhi: 1065.6,
        t_dni: 8681.2,
        t_ghi: 5926.9,
        t_solar_rad: null,
        temp: null,
        temp_wetbulb: null,
        timestamp_local: null,
        timestamp_utc: null,
        wind_dir: null,
        wind_spd: null,
      },
      {
        cdd: 0,
        clouds: null,
        date: "2024-03-20",
        dewpt: null,
        hdd: 0,
        max_wind_dir: null,
        max_wind_spd: null,
        precip: 0,
        revision_status: "interim",
        rh: null,
        snow: null,
        sun_hours: 6,
        t_dhi: 1071.5,
        t_dni: 8726.4,
        t_ghi: 5980.2,
        t_solar_rad: null,
        temp: null,
        temp_wetbulb: null,
        timestamp_local: null,
        timestamp_utc: null,
        wind_dir: null,
        wind_spd: null,
      },
    ],
    end_date: "2024-03-21",
    lat: 38.2526647,
    lon: -85.7584557,
    sources: [
      "724230-93821",
      "USC00154956",
      "USC00151531",
      "USC00154949",
      "USC00124382",
      "USC00154955",
      "US1INCK0005",
      "US1INCK0014",
      "US1KYJF0035",
      "US1INCK0023",
      "US1INCK0018",
      "US1KYJF0033",
      "US1INCK0027",
      "USW00093821",
      "US1INCK0011",
      "USC00126102",
      "USW00013810",
      "US1KYJF0052",
      "US1INFD0020",
      "US1INCK0020",
      "US1INFD0004",
      "imerg",
      "era5",
      "sat",
      "radar",
    ],
    start_date: "2024-03-14",
    state_code: "KY",
    station_id: "724230-93821",
    threshold_units: "F",
    threshold_value: "63",
    timezone: "America/New_York",
  };

  // useEffect(() => {
  //   // get date information to collect for last 7 days
  //   const todays_date = dayjs(); // todays date object
  //   const start_date = todays_date.subtract(7, "day").format("YYYY-MM-DD"); // subtracted 7 days and formatted
  //   const end_date = todays_date.format("YYYY-MM-DD"); // formatted to required format

  //   // request made to weatherbit API to collect weather data for specified coordinates and dates
  //   fetch(
  //     `https://api.weatherbit.io/v2.0/history/energy?lat=${lat}&lon=${lng}&start_date=${start_date}&end_date=${end_date}&threshold=63&units=I&key=${
  //       import.meta.env.VITE_WEATHER_API_KEY
  //     }&tp=daily`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // }, [lat,lng]);

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
        {dummy.city_name +
          (dummy.state_code ? ", " + dummy.state_code : "") +
          (dummy.country_code ? ", " + dummy.country_code : "")}
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
          {dummy.data.map((data, index) => (
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
