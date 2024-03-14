import React from "react";

import Stack from "@mui/material/Stack";
import SearchPlaces from "../../common/SearchPlaces";

export default function LandingPage() {
  return (
    <div style={{ margin: "auto" }}>
      <Stack spacing={2} direction="column" textAlign="center">
        <h1>Weatheria</h1>

        <SearchPlaces />
      </Stack>
    </div>
  );
}
