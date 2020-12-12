import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

import NavItem from "./NavItem/NavItem";

export default function NavItems() {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <header className="nav">
      <NavItem />
      <button
        onClick={logout}
        className="btn-logout"
      >Sair da aplicação
      </button>
    </header>
  );
}
