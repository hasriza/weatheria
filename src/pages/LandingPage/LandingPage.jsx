import React, { useState } from "react";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [address, setAddress] = useState("");
  const [openWarning, setOpenWarning] = React.useState(false);

  const navigate = useNavigate();

  const closeWarning = () => setOpenWarning(false);

  const getCoords = () => {
    if (!address) {
      setOpenWarning(true);
    } else {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => navigate(`weather/${latLng.lat}/${latLng.lng}`))
        .catch((error) => console.error("Error", error));
    }
  };

  return (
    <div style={{ margin: "auto" }}>
      <Snackbar
        open={openWarning}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={3000}
        onClose={closeWarning}
      >
        <Alert onClose={closeWarning} severity="warning" variant="filled" sx={{ width: "100%" }}>
          Please enter location for weather!
        </Alert>
      </Snackbar>

      <Stack spacing={2} direction="column" textAlign="center">
        <h1>Weatheria</h1>

        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={setAddress}
          searchOptions={{ types: ["locality", "country"] }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div key="input-bar">
              <TextField
                id="filled-basic"
                label="Location"
                variant="filled"
                style={{ backgroundColor: "#fff", borderRadius: "8px" }}
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div
                key="drop-down-container"
                className="autocomplete-dropdown-container"
                style={{ color: "#000", width: "260px", position: "absolute", zIndex: "10" }}
              >
                {loading && <div style={{ backgroundColor: "#fff" }}>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style: { ...style, maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis" },
                      })}
                      key={suggestion.placeId}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Button variant="contained" onClick={getCoords}>
          Get Weather
        </Button>
      </Stack>
    </div>
  );
}
