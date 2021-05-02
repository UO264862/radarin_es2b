// External dependences
import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoggedOut, LoggedIn } from "@solid/react";

// Dependences from: ~/ui
import './App.css';
import About from './ui/about/About';
import Friends from './ui/friends/Friends';
import LogIn from './ui/logIn/LogIn';
import MapView from './ui/map/MapView';
import MNavBar from './ui/navBar/MNavBar';
import Profile from './ui/profile/Profile';
import PaginaBloqueada from './ui/admin/PaginaBloqueada';
import Admin from './ui/admin/Admin';
import RAdmin from './ui/admin/RAdmin';

function App(props) {

 //pide permisos de notificaciones al usuario
 Notification.requestPermission();

  return (
    <BrowserRouter>
      <div className="App">
        <LoggedOut>
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/radmin">
            <RAdmin />
          </Route>
          <Route path="/administrar">
            <Admin />
          </Route>
          <Route path="/error">
            <PaginaBloqueada />
          </Route>
          <Route path="/">
            <LogIn />
          </Route>
          </Switch>
        </LoggedOut>
        <LoggedIn>
          <header>
            <MNavBar />
          </header>
          <div style={{ height: "60px" }}>
          </div>
          <Switch>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/perfil">
              <Profile />
            </Route>
            <Route path="/amigos">
              <Friends />
            </Route>
            <Route path="/mapa">
              <MapView />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <div>
                <MapView />
              </div>
            </Route>
          </Switch>
        </LoggedIn>
      </div>
    </BrowserRouter>

  )
}

export default App;