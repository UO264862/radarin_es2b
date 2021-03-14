import React from 'react';
import Friends from './Friends/Friends';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'
import { getDefaultSession, Session } from '@inrupt/solid-client-authn-browser';
import { useWebId, List, Value, Name, Link } from "@solid/react";

function Welcome(props) {
  return <div><h1>Hi !! </h1><span>{props.name}</span><Button onClick={()=> ReactDOM.render(<React.StrictMode>
    <Friends/>
   </React.StrictMode>,document.getElementById('root'))}>Amigos</Button></div>;

}

export default Welcome;