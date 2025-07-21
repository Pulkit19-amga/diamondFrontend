import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axios";

const MegaMenuContext = createContext();

export const MegaMenuProvider = ({ children }) => {
  const [categoryMap, setCategoryMap] = useState({});
  const [mainCategories, setMainCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [styles, setStyles] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [loadingJewelry, setLoadingJewelry] = useState(true);
  const [loadingEngagement, setLoadingEngagement] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/api/jewelry")
      .then((res) => {
        setMainCategories(res.data.categories);
        setCategoryMap(res.data.categoryMap);
        setCollections(res.data.collections);
      })
      .catch((error) => {
        console.error("Error fetching Jewelry data: ", error);
      })
      .finally(() => setLoadingJewelry(false));
  }, []);

  useEffect(() => {
    axiosClient
      .get("api/engagement")
      .then((res) => {
        setStyles(res.data.styles);
        setShapes(res.data.shapes);
      })
      .catch((error) => {
        console.error("Error fetching Engagement Data: ", error);
      })
      .finally(() => {
        setLoadingEngagement(false);
      });
  }, []);

  return (
    <MegaMenuContext.Provider
      value={{
        categoryMap,
        mainCategories,
        loadingJewelry,
        collections,
        styles,
        shapes,
        loadingEngagement,
      }}
    >
      {children}
    </MegaMenuContext.Provider>
  );
};

export const useMegaMenu = () => useContext(MegaMenuContext);
