import React from 'react'
import './static/style/style.css'
import './static/style/mobile.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAccount from "./pages/MyAccount";
import ShopPage from "./pages/ShopPage";

function App() {
  return <Router>
    <Route exact path="/">
      <Homepage />
    </Route>
    <Route path="/zaloguj-sie">
      <LoginPage />
    </Route>
    <Route path="/zarejestruj-sie">
      <RegisterPage />
    </Route>
    <Route path="/moje-konto">
      <MyAccount />
    </Route>
    <Route path="/sklep">
      <ShopPage />
    </Route>
    <Route path="/produkt">

    </Route>
    <Route path="/koszyk">

    </Route>
    <Route path="/zamowienie">

    </Route>
  </Router>
}

export default App;
