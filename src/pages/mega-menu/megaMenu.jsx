import React, { useEffect, useState } from "react";
import "./megaMenu.css";

import axiosClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const MegaMenu = () => {
  const [categoryMap, setCategoryMap] = useState({});
  const [mainCategories, setMainCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get("/api/categories-map").then((res) => {
      setMainCategories(res.data.categories);
      setCategoryMap(res.data.categoryMap);
    });
  }, []);

  const handleClick = (main, sub = null) => {
    const mainParam = `${slugify(main.name)}-${main.id}`;
    const subParam = sub ? `${slugify(sub.name)}-${sub.id}` : null;

    const params = new URLSearchParams();
    params.set("category", mainParam);
    if (subParam) params.set("subcategory", subParam);
    navigate(`/jewelry-list?${params.toString()}`);
  };

  return (
    <div className="jwl-mega-menu-container-fixed">
      <div className="jwl-mega-menu">
        {mainCategories.map((main) => (
          <div className="jwl-mega-col" key={main.id}>
            <h6 className="jwl-menu-title">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(main);
                }}
              >
                {main.name}
              </a>
            </h6>
            <ul className="jwl-list">
              {(categoryMap[main.name] || []).map((sub) => (
                <li key={sub.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(main, sub);
                    }}
                  >
                    {sub.name}
                  </a>
                </li>
              ))}
              <li className="jwl-shop-all">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(main);
                  }}
                >
                  SHOP ALL
                </a>
              </li>
            </ul>

          </div>
        ))}

        <div className="jwl-mega-col jwl-image-col">
          <img src="/images/jewelry_dropdown.jpg" alt="Stackable Earrings" />
          <div className="jwl-caption">
            <h6>Stackable Earrings</h6>
            <a href="#">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
