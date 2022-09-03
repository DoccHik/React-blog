import React from "react";
import "../Footer/Footer.css";

const Footer = ({ year }) => {
  return (
    <footer>
      <span>@React Blog - {year}</span>
    </footer>
  );
};

export default Footer;
