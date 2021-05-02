// External dependences
import 'leaflet/dist/leaflet.css';
import {  useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

// Dependences from: ~/ui/map
import './map.css';
import { getMarkers, calcularDistancia } from './Markers';


// Import dependences
import { addUsuario, modificarCoordenadas, getUsernameByWebId, getEstadoCuentaUsuario } from '../api/api';

// Dependences from: ~/util
import { useInterval } from '../util/hooks/UseInterval';
import { getMapBoxAccessToken, getAttributionMessage } from '../util/CommonDataConfiguration';

// Domain dependences
import ServicesFactory from '../domain/ServicesFactory';

import{useWebId } from "@solid/react";

// Functional React Component using React Hooks
// https://es.reactjs.org/docs/components-and-props.html
function MapView(props) {
    
    const webId=useWebId();
    
    if(webId!==undefined){
        addUsuario(webId).then(async function(){
            let estado=await getEstadoCuentaUsuario(webId);
            if (estado.estado==="BLOQUEADA"){
                var a=document.getElementsByTagName("button");
                a[1].click();
                window.location.href =window.location.origin+"/error";
            }
        });   
    }
    const [state, setState] = useState({
        user: ServicesFactory.forCurrentUser().getDefaultUser(),
        friends: null,
        near:false
    });
    
    const refreshState = async () => {
        let amigosCerca=false;
        let username = (await getUsernameByWebId(webId)).nombreUsuario;
        let distancia;
        let receivedUser = await ServicesFactory.forCurrentUser().getLoggedUser(username);
        let amigos=await ServicesFactory.forCurrentUser().getFriends(webId);
        let numeroDeAmigosTotal=amigos.length;
        let numeroDeAmigo=0;
        for(const amigo of amigos){
            numeroDeAmigo++;
            distancia=await calcularDistancia(receivedUser.latitude,receivedUser.longitude,amigo.latitude,amigo.longitude); 
            if(distancia<=300){
                amigosCerca=true
                break;
            }
            if(numeroDeAmigo===numeroDeAmigosTotal){
                amigosCerca=false
            }
        }
        if(amigosCerca && state.near===false){
            toast.info("Tienes amigos cerca", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 5000
              });
        }
        if (receivedUser != null){
            setState({ user: receivedUser, friends:amigos ,near:amigosCerca});
            await modificarCoordenadas(webId,receivedUser.latitude+","+receivedUser.longitude);
        }
    }
    
    useInterval(refreshState,10000);
    
    let users = [state.user];
    Array.prototype.push.apply(users, state.friends);
    let usersMarkers = getMarkers(users);

    return (
        <MapContainer center={state.user.getLatLng()} zoom={parseFloat(17)} >
            <TileLayer
                url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + getMapBoxAccessToken()}
                attribution={getAttributionMessage()}
                maxZoom={parseInt(18)}
                id='mapbox/streets-v11'
                tileSize={parseInt(512)}
                zoomOffset={parseInt(-1)}
            />
            {usersMarkers}
            <ToastContainer />
        </MapContainer >
    );
}

export default MapView;
