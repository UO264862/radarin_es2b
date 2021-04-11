// External dependences
import React, { useState } from 'react';
import { SessionProvider } from "@inrupt/solid-ui-react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useSession } from "@inrupt/solid-ui-react/dist";
import "bootstrap/dist/css/bootstrap.min.css";

// Dependences from: ~/ui
import './App.css';
import About from './ui/about/About';
import Friends from './ui/friends/Friends';
import LogIn from './ui/logIn/LogIn';
import MapView from './ui/map/MapView';
import MNavBar from './ui/navBar/MNavBar';
import PlaceholderPage from './ui/placeholderPage/PlaceholderPage';
import Profile from './ui/profile/Profile';
function App(props) {

  //pide permisos de notificaciones al usuario
  Notification.requestPermission();
  
  //We use this state variable
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //With this we can control the login status for solid
  const { session } = useSession();

  //We have logged in
  session.onLogin(() => {
    setIsLoggedIn(true)
  })

  //We have logged out
  session.onLogout(() => {
    setIsLoggedIn(false)
  })
  
 
  return (
      <BrowserRouter>
        <div className="App">
          <header>
            <MNavBar />
          </header>
          <div style={{ height: "60px" }}>
          </div>
          {(!isLoggedIn) ? <LogIn/> : 
          <Switch>
            <Route path="/login">
              <MapView />
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
          </Switch>}
          </div>
      </BrowserRouter>
  );
}
//<Welcome name={getDefaultSession().info.webId} />

export default App;