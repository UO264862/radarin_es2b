import './LogIn.css';
import React from 'react';
import {Grid } from '@material-ui/core'
import LoginButton from "./LoginButtons"
import { Link} from 'react-router-dom';
function LogIn(props) {
    return (
        <div className="loginbackground">
        <div style={{ position: "absolute", bottom: "10%" , width:"100%"}}>
            <div >
            </div>
            <Grid className="container-buttons" container direction="column">
                <LoginButton className="loginButton" />
            </Grid>
            <Link to="/radmin" >Accede como administrador</Link>
        </div>
        
        </div>
    )
}
export default LogIn;