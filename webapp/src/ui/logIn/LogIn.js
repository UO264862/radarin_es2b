import './LogIn.css';
import React from 'react';
import {Grid } from '@material-ui/core'
import Provider from './Provider';
import WebId from './WebId';
import { LoginButton, RegisterButton } from "./LoginButtons"


function LogIn(props) {
    return (
        <section style={{display:"inline-block"}}>
                <div className="container-provider-webid">
                    <Provider />
                    <div className="divisor">
                        {/*<span className="divisor-line"></span>*/}
                        <span className="divisor-text"> -OR- </span>
                        {/*<span className="divisor-line"></span>*/}
                    </div>
                    <WebId />
                </div>
            <Grid className="container-buttons" container direction="column">
                <RegisterButton />
                <LoginButton />
            </Grid>

        </section>
    );
}
export default LogIn;