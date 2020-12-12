import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from "./pages/Home";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
    </BrowserRouter>
  );
}
