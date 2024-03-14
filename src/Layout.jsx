import React from "react";
import { Outlet } from "react-router-dom";

// Basic Layout component which can be used to design common layout for all pages
export default function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}
