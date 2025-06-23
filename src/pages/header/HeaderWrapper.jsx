// components/HeaderWrapper.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header";       // transparent header (home)
import SecondHeader from "./secondHeader";   // white header with megamenu

const HeaderWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [showSecondHeader, setShowSecondHeader] = useState(false);

  const handleJewelryHover = (status) => {
    setShowSecondHeader(status);
  };

  if (!isHomePage) return <SecondHeader />;

  return showSecondHeader ? (
    <SecondHeader onHoverChange={handleJewelryHover} />
  ) : (
    <Header onHoverChange={handleJewelryHover} />
  );
};

export default HeaderWrapper;
