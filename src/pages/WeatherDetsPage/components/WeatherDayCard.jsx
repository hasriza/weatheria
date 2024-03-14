import React from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";

export default function WeatherDayCard({ dayItem, showModal }) {
  return (
    <Card variant="elevation" style={{ textAlign: "center", cursor: "pointer" }} raised onClick={showModal}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {dayjs(dayItem.date).format("ddd, DD/MM")}
        </Typography>
        <Typography variant="h5" component="div">
          {dayItem.temp || "-"}&deg; C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dayItem.wind_spd || "-"}m/s <b>/</b> {dayItem.temp_wetbulb || "-"}&deg; C
        </Typography>
      </CardContent>
      <Typography variant="subtitle1" component="a">
        Click for more details
      </Typography>
    </Card>
  );
}
