// Dependences from: ~/ui/logIn/modules
import React from "react";
import { AuthButton } from "@solid/react";
import './LogIn.css';


class LoginButton extends React.Component {

    render() {
        return (
                <AuthButton className="loginButton" id="logout" data-testid="btini" popup={"https://inrupt.net/common/popup.html"} />
        )
    }
}

export default LoginButton;