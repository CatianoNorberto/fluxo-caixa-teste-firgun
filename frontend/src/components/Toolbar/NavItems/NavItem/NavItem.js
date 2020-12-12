import React from "react";

import logoImg from "../../../../logo.png";

import "./styles.css";

export default function NavItem(props) {
  return (
    <div className="nav-left">
      <img src={logoImg} alt="Logo" />
    </div>
  );
}
