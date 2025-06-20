import React from 'react';
import './megaMenu.css';

const MegaMenu = () => {
  return (
    <div className="jwl-mega-menu-container-fixed">
      <div className="jwl-mega-menu">
        {/* EARRINGS */}
        <div className="jwl-mega-col">
          <h6 className="jwl-menu-title">EARRINGS</h6>
          <ul className="jwl-list">
            <li><a href="#">Studs</a></li>
            <li><a href="#">Hoops</a></li>
            <li><a href="#">Halo</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Ear Cuffs</a></li>
            <li><a href="#">Stackable</a></li>
            <li><a href="#">Gemstone</a></li>
            <li><a href="#">Luxe</a></li>
            <li><a href="#">Ready to Ship</a></li>
            <li><a href="#">Create Your Own</a></li>
            <li className="jwl-shop-all"><a href="#">SHOP ALL</a></li>
          </ul>
        </div>

        {/* BRACELETS */}
        <div className="jwl-mega-col">
          <h6 className="jwl-menu-title">BRACELETS</h6>
          <ul className="jwl-list">
            <li><a href="#">Tennis</a></li>
            <li><a href="#">Mixed Shape</a></li>
            <li><a href="#">Bangle</a></li>
            <li><a href="#">Bolo</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Luxe</a></li>
            <li><a href="#">Ready to Ship</a></li>
            <li className="jwl-shop-all"><a href="#">SHOP ALL</a></li>
          </ul>
        </div>

        {/* RINGS */}
        <div className="jwl-mega-col">
          <h6 className="jwl-menu-title">RINGS</h6>
          <ul className="jwl-list">
            <li><a href="#">Anniversary</a></li>
            <li><a href="#">Eternity</a></li>
            <li><a href="#">Stackable</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Gemstone</a></li>
            <li><a href="#">Luxe</a></li>
            <li><a href="#">Ready to Ship</a></li>
            <li><a href="#">Create Your Own</a></li>
            <li className="jwl-shop-all"><a href="#">SHOP ALL</a></li>
          </ul>
        </div>

        {/* NECKLACES */}
        <div className="jwl-mega-col">
          <h6 className="jwl-menu-title">NECKLACES</h6>
          <ul className="jwl-list">
            <li><a href="#">Halo</a></li>
            <li><a href="#">Solitaire</a></li>
            <li><a href="#">Tennis</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Gemstone</a></li>
            <li><a href="#">Luxe</a></li>
            <li><a href="#">Ready to Ship</a></li>
            <li><a href="#">Create Your Own</a></li>
            <li className="jwl-shop-all"><a href="#">SHOP ALL</a></li>
          </ul>
        </div>

        {/* COLLECTIONS */}
        <div className="jwl-mega-col">
          <h6 className="jwl-menu-title">COLLECTIONS</h6>
          <ul className="jwl-list">
            <li><a href="#">NEW: Atrium</a></li>
            <li><a href="#">NEW: Bond</a></li>
            <li><a href="#">W Signature</a></li>
            <li><a href="#">Brooches</a></li>
            <li><a href="#">Toi et Moi</a></li>
            <li><a href="#">Bouquet</a></li>
            <li><a href="#">The Ceramic Series</a></li>
            <li><a href="#">Elements</a></li>
            <li><a href="#">Cluster</a></li>
            <li><a href="#">Luxe</a></li>
            <li><a href="#">The Reserve</a></li>
          </ul>
        </div>

        {/* IMAGE */}
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
