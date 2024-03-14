import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";

export default function SearchPlaces() {
  const [address, setAddress] = useState(""); // address variable to store selected and entered address
  const [openError, setOpenError] = React.useState(false); // variable to show/hide error if user does not enter address
  const [errorText, setErrorText] = React.useState(""); // error text for failed response from weather api

  const navigate = useNavigate(); // router navigate object to redirect to different URL

  const closeError = () => setOpenError(false); // function to close error message alert

  // function that gets co-ordinate values from address using google maps API and redirects user to weather details page
  const getCoords = () => {
    // reset error text for new request
    setErrorText("");
    if (!address) {
      // raise error if no address provided
      setOpenError(true);
    } else {
      // find detailed information of address in object format using Google maps API
      geocodeByAddress(address)
        // get co-ordinates using reverse geocoding provided by Maps API
        .then((results) => getLatLng(results[0]))
        // on successful response redirect user to details page with co-ordinates
        .then((latLng) => navigate(`weather/${latLng.lat}/${latLng.lng}`))
        // handle error by raising alert with error details
        .catch((error) => {
          setErrorText(error);
          setOpenError(true);
        });
    }
  };

  return (
    <>
      {/* Pop-up component in material UI to show/hide error */}
      <Snackbar
        open={openError}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={3000}
        onClose={closeError}
      >
        {/* Alert with error message if errorText has value else default error message is shown */}
        <Alert onClose={closeError} severity="error" variant="filled" sx={{ width: "100%" }}>
          {errorText || "Please enter location for weather!"}
        </Alert>
      </Snackbar>

      {/* Auto-complete component to show drop-down of locations based on city and country  */}
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
              style={{ backgroundColor: "#fff", borderRadius: "8px", width: "260px" }}
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
    </>
  );
}
