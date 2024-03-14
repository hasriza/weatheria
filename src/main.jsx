import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage.jsx";

import "./index.css";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Layout from "./Layout.jsx";

// router variable that stores routing information as specified in react router v6
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "weather/:lat/:lng", // route with parameters to retrieve information on details page
        // lazy loading to reduce size of main chunk loaded at first
        lazy: async () => {
          let { WeatherDetsPage } = await import("./pages/WeatherDetsPage/WeatherDetsPage.jsx");
          return { Component: WeatherDetsPage };
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  </React.StrictMode>
);
