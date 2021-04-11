import FileClient from "solid-file-client";
import auth, { handleIncomingRedirect, logout, login, register, getDefaultSession } from "@inrupt/solid-client-authn-browser";
//permite logearse ya sea por proveedor como por webId
async function Login(provider, webId) {
    await handleIncomingRedirect();
    const exist = await existWebId(webId);
    const size = String(webId).length;
    if (exist && size > 0) {
        //alert("Valido " + webId);
        provider = getProvider(webId);
        //await auth.login(provider);
        await LoginWithProvider(provider);
    }
    else if (size === parseInt(0)) {
        //alert("WebId vacio " + webId);
        //await auth.login(provider);
        await LoginWithProvider(provider);
    }
    else {
        alert("WebID invalido: " + webId);
    }
}
//comprueba que existe ese webId en los diferentes pods
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
//obtiene el proveedor a partir de un webId
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
//te logea pro proveedor
async function LoginWithProvider(provider) {

    var not = new Notification("Bienvenido!!"); //mostramos un mensaje de bienvenida 
    setTimeout(not.close, 3000);

    if (!getDefaultSession().info.isLoggedIn) {
        await login({
            oidcIssuer: provider,
            redirectUrl: window.location.href
        });
    }
    else {
        alert(`Logged in as ${getDefaultSession().info.webId}`)
    }

}
//permite registrarte en el proveedor escogido
const Register = async (provider) => {

}

const Logout = async () => {
    logout({ returnTo: window.location.origin });
}
export { Login, Register, Logout }