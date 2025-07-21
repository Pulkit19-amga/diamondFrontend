import React, { useState } from "react";
import "./megaMenu.css";
import { useNavigate } from "react-router-dom";
import { useMegaMenu } from "../../context/MegaMenuContext";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const MegaMenu = ({ type = "engagement", closeMegaMenu = () => {} }) => {
  const {
    categoryMap = {},
    mainCategories = [],
    loadingJewelry = false,
    collections = [],
    styles = [],
    shapes = [],
    loadingEngagement = false,
  } = useMegaMenu() || {};

  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState("diamond");

  const handleStartEngagement = (startType) => {
    closeMegaMenu();
    navigate(`/jewelry-list/${startType}`);
  };

  const handleJewelryClick = (main, sub = null) => {
    const mainParam = `${slugify(main.name)}-${main.id}`;
    const subParam = sub ? `${slugify(sub.name)}-${sub.id}` : null;

    const params = new URLSearchParams();
    params.set("category", mainParam);
    if (subParam) params.set("subcategory", subParam);

    closeMegaMenu();
    navigate(`/jewelry-list?${params.toString()}`);
  };

  const handleCollectionClick = (collection) => {
    const slug = `${slugify(collection.name)}-${collection.id}`;
    const params = new URLSearchParams();
    params.set("menucollection", slug);

    closeMegaMenu();
    navigate(`/jewelry-list?${params.toString()}`);
  };

  return (
    <div className="jwl-mega-menu-dropdown">
      {type === "jewelry" && (
        <div className="jwl-mega-menu-inner container">
          {loadingJewelry
            ? [...Array(4)].map((_, i) => (
                <div className="jwl-mega-col placeholder-glow" key={i}>
                  <h6
                    className="placeholder"
                    style={{ width: "100px", height: "16px" }}
                  ></h6>
                  <ul className="jwl-list">
                    {[...Array(5)].map((_, j) => (
                      <li key={j}>
                        <div
                          className="placeholder"
                          style={{ width: "80%", height: "14px" }}
                        ></div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : mainCategories.map((main) => (
                <div className="jwl-mega-col" key={main.id}>
                  <h6 className="jwl-menu-title">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleJewelryClick(main);
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
                            handleJewelryClick(main, sub);
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
                          handleJewelryClick(main);
                        }}
                      >
                        SHOP ALL
                      </a>
                    </li>
                  </ul>
                </div>
              ))}

          {/* COLLECTIONS Column - always shown */}
          <div className="jwl-mega-col">
            <h6 className="jwl-menu-title">COLLECTIONS</h6>
            <ul className="jwl-list">
              {Array.isArray(collections) &&
                collections.map((item) => (
                  <li key={item.id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCollectionClick(item);
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Image Column */}
          <div className="jwl-mega-col jwl-image-col">
            <img src="/images/jewelry_dropdown.jpg" alt="Stackable Earrings" />
            <div className="jwl-caption">
              <h6>Stackable Earrings</h6>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  closeMegaMenu();
                  navigate("/stackable-earrings");
                }}
              >
                SHOP NOW
              </a>
            </div>
          </div>
        </div>
      )}
      {type === "engagement" && (
        <div
          className="jwl-mega-menu-inner container"
          onMouseLeave={() => setHoveredOption(null)} // hide on leave
        >
          <div className="jwl-mega-col">
            <h6 className="jwl-menu-title">ENGAGEMENT</h6>
            <ul className="jwl-list">
              <li
                onMouseEnter={() => setHoveredOption("setting")}
                className="clickable"
                style={{ fontWeight: hoveredOption === "setting" ? 600 : 400 }}
              >
                <a
                  href="#"
                  /* onClick={(e) => {
                    e.preventDefault();
                    navigate("/start-with-setting");
                    closeMegaMenu();
                  }} */
                  onClick={(e) => {
                    e.preventDefault();
                    handleStartEngagement("engagement-rings");
                  }}
                >
                  Start With A Setting &gt;
                </a>
              </li>

              <li
                onMouseEnter={() => setHoveredOption("diamond")}
                style={{ fontWeight: hoveredOption === "diamond" ? 600 : 400 }}
              >
                <span>Start With A Diamond &gt;</span>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/preset-engagement-rings");
                    closeMegaMenu();
                  }}
                >
                  Preset Engagement Rings &gt;
                </a>
              </li>
            </ul>
          </div>

          {hoveredOption === "setting" && (
            <>
              {/* STYLES Column */}
              <div className="jwl-mega-col">
                <h6 className="jwl-menu-title">STYLE</h6>
                <ul className="jwl-list">
                  {styles.map((style) => (
                    <li key={style.psc_id}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const slug = `${slugify(style.psc_name)}-${
                            style.psc_id
                          }`;
                          const params = new URLSearchParams();
                          params.set("style", slug);
                          closeMegaMenu();
                          navigate(`/engagement-rings?${params.toString()}`);
                        }}
                      >
                        {style.psc_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SHAPES Column */}
              <div className="jwl-mega-col">
                <h6 className="jwl-menu-title">SHAPE</h6>
                <ul className="jwl-list">
                  {shapes.map((shape) => (
                    <li key={shape.id}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const slug = `${slugify(shape.name)}-${shape.id}`;
                          const params = new URLSearchParams();
                          params.set("shape", slug);
                          closeMegaMenu();
                          navigate(`/engagement-rings?${params.toString()}`);
                        }}
                      >
                        {shape.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {hoveredOption === "diamond" && (
            <div className="jwl-mega-col">
              <ul className="jwl-list">
                {[
                  { name: "Lab Diamond", path: "/lab-diamonds" },
                  { name: "Natural Diamond", path: "/natural-diamonds" },
                  {
                    name: "Colored Lab Diamond",
                    path: "/colored-lab-diamonds",
                  },
                  { name: "Featured Deals", path: "/featured-deals" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        closeMegaMenu();
                        navigate(item.path);
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FEATURED Column */}
          <div className="jwl-mega-col">
            <h6 className="jwl-menu-title">FEATURED</h6>
            <ul className="jwl-list">
              {[
                { label: "Wave", path: "/engagement-wave" },
                { label: "W Signature", path: "/engagement-signature" },
                { label: "Fully Custom", path: "/fully-custom" },
                { label: "New Arrivals", path: "/new-arrivals" },
                { label: "Best Sellers", path: "/best-sellers" },
                { label: "Ready To Ship", path: "/ready-to-ship" },
                { label: "Home Preview", path: "/home-preview" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMegaMenu();
                      navigate(item.path);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Column - can stay always visible or toggle based on hoveredOption */}
          <div className="jwl-mega-col jwl-image-col">
            <video
              src="https://cdn.shopify.com/videos/c/o/v/2e800afe873a48608dec71f9c26b6c98.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="jwl-mega-video"
            ></video>
            <div className="jwl-caption">
              <h6>Discover Our Best Sellers</h6>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  closeMegaMenu();
                  navigate("/engagement-classics");
                }}
                style={{ color: "blue" }}
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
