import { getDefaultSession, login } from "@inrupt/solid-client-authn-browser";
import FileClient from "solid-file-client";
import auth from "solid-auth-client";


const Login = async (provider, webId) => {
    const session = getDefaultSession();
    const exist = await existWebId(webId);
    const size = String(webId).length;
    if (exist && size > 0) {
        alert("Valido " + webId);
        provider = getProvider(webId);
        await loginWithProvider(provider, session);

    }
    else if (size === parseInt(0)) {
        alert("WebId vacio " + webId);
        await loginWithProvider(provider, session);
    }
    else {
        alert("Invalido " + webId);
    }
}

async function existWebId(webId) {
    try {
        const fc = new FileClient(auth);
        let op = async (client) => await client.itemExists(webId);
        return await op(fc);
    }
    catch (e) {
        return false;
    }
}

function getProvider(webId) {
    if (webId.includes("profile")) {
        const webIdParts = webId.split("/");
        const providerParts = webIdParts[2].split(".");
        const provider = "https://m." + providerParts[1] + "." + providerParts[2];
        alert(provider);
        return provider;
    }
    return webId
}

//function LoginService (props) {
//login(provider) {
//var session = getDefaultSession();
//if (!session.info.isLoggedIn) {
//return login({
//oidcIssuer: provider,
//redirectUrl: window.location.href
//});
//}
//}
//}

function loginWithProvider(provider, session) {
    if (!session.info.isLoggedIn) {
        return login({  //Session restore
            oidcIssuer: provider,
            redirectUrl: window.location.href
        });
    }
}

const Register = async (provider) => {
    alert(provider)
    const session = getDefaultSession();
    if (!session.info.isLoggedIn) {
        return login({
            oidcIssuer: provider + "/register",
            redirectUrl: window.location.href
        });
    }
}

export { Login, Register }