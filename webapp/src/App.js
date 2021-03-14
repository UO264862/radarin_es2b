import React, { useState } from 'react';
import './App.css';
import LogIn from './components/LogIn/LogIn';
import { SessionProvider } from "@inrupt/solid-ui-react";
import MNavBar from './components/NavBar/MNavBar';
import MainPage from './components/Main/MainPage';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession } from "@inrupt/solid-ui-react/dist";
<<<<<<< HEAD
import Welcome from './components/Welcome';
import { getDefaultSession, Session } from '@inrupt/solid-client-authn-browser';
import Friends from './components/Friends/Friends';
import data from "@solid/query-ldflex";



const App = () => {
=======
// import { getDefaultSession, Session } from '@inrupt/solid-client-authn-browser';
// import Welcome from './components/Welcome';
import MapView from './components/map/MapView';
import Friends from './components/Friends/Friends';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useSession } from "@inrupt/solid-ui-react/dist";
// import Welcome from './components/Welcome';
// import { getDefaultSession, Session } from '@inrupt/solid-client-authn-browser';
// import data from "@solid/query-ldflex";
>>>>>>> tmp

  function App(props) {
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


    // <Welcome name={getDefaultSession().info.webId}/>}
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <MNavBar />
          </header>
          <br /><br /><br /><br /><br /><br />
          <Switch>
            <Route path="/login">
              <SessionProvider sessionId="log-in-example">
                {(!isLoggedIn) ? <LogIn /> : <MapView />}
              </SessionProvider>
            </Route>
            <Route path="/">
              <div>
                <MainPage />
              </div>
            </Route>
            <Route path="/friends">
              <div>
                <Friends />
              </div>
            </Route>
          </Switch>
        </div>

      </BrowserRouter>
    );
  }
  //<Welcome name={getDefaultSession().info.webId} />

  export default App;