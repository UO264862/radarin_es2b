//Dependences external
import React from 'react';
import ReactDOM from 'react-dom';
import { useWebId, List, Name, Link } from "@solid/react";
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { ToastContainer } from 'react-toastify';
import { calcularDistancia2 } from "./modules/Markers";
import 'react-toastify/dist/ReactToastify.css';

import './styles/Friends.css';

// Domain dependences
import ServicesFactory from "../domain/ServicesFactory";
import FriendsService from '../domain/friends/FriendUsersService';

let peticionesCompletadas = []
let peticionesPendientes = []
let distanciasAmigos;

export const Friends = ()  => {

  const webId = useWebId();
  const FriendsService = ServicesFactory.forFriendUsers(webId);
  listarPeticionesPendientes(webId)
  listarPeticionesCompletadas(webId)
  listarDistancias(webId);

  return (
    <div id="friends" title="Friends">
      <div className="prueba">
        <h2>Añadir Amigos</h2>
        <div className="wrap">
          <div className="search">
            <input type="text" className="friends-webid-input" placeholder="pepito" id="input" />
            <button type="submit" className="searchButton" onClick={() => FriendsService.addFriendRequestService(document.getElementById("input").value, webId)}>
              <SearchOutlinedIcon className="iconSearch" />
            </button>
          </div>
        </div>
        <br></br>
        <h2>Lista de peticiones de amistad</h2>
        <div id="completadas" className="list-completadas" padding-inline-start="0">
        </div>
        <br></br>
        <div id="pendientes" className="list-pendientes" padding-inline-start="0">
        </div>
        <br></br>
        <h2>Lista de amigos</h2>
        <List src={`[${webId}].friends`} className="list" padding-inline-start="0">{(friend) =>
          <li key={friend} className="listElement">
            <Card nombre={`${friend}`} web={webId} distanciasAmigos={distanciasAmigos}></Card>
          </li>}
        </List>
        <ToastContainer />
      </div>
    </div>
  )
}

export async function listarPeticionesCompletadas(webId) {
  peticionesCompletadas = await new FriendsService(webId).getPeticionesCompletadas(webId);
    ReactDOM.render(
      <ListaPeticionesCompletadas />,
      document.getElementById("completadas")
    )
}

export async function listarDistancias(webId) {
  distanciasAmigos = await calcularDistancia2(webId);
}

export const ListaPeticionesCompletadas = ({ peticionesOpcional }) => {
  const webId = useWebId();
  const FriendsService = ServicesFactory.forFriendUsers(webId);
  if (peticionesOpcional)
    peticionesCompletadas = peticionesOpcional
  var listItems = peticionesCompletadas.map((peticion) =>
    <li key="{item}"><PeticionCompletada peticion={peticion} confirmar={() => FriendsService.confirmFriendRequest(webId, peticion.webid)} /></li>
  );
  return (
    <ul className="list">
      {listItems}
    </ul>
  )
}

export const PeticionCompletada = ({ peticion, confirmar }) => {
  var nombre = peticion.nombreUsuario
  var webId = peticion.webid
  var confir = confirmar
  return (
    <div className="card" >
      <div>
        <h4 className="peticiones">
          <Name src={nombre}> {nombre} </Name>
        </h4>
        <center>
          <div className="botones">
            <Button variant="contained" className="buttoncard" name="Confirmar" id="botonOpcionC" value={webId} datatype="button" onClick={confir}>Confirmar</Button>
          </div>
        </center>
      </div>
    </div>
  )
}

export async function listarPeticionesPendientes(webId) {
  console.log(webId)
  peticionesPendientes = await new FriendsService(webId).getPeticionesPendientes(webId);
    ReactDOM.render(
      <ListaPeticionesPendientes />,
      document.getElementById("pendientes")
    )
}

export const ListaPeticionesPendientes = ({ peticionesOpcional }) => {
  const webId = useWebId();
  const FriendsService = ServicesFactory.forFriendUsers(webId);
  if (peticionesOpcional)
    peticionesPendientes = peticionesOpcional
  var listItems = peticionesPendientes.map((peticion) =>
    <li key="{item}"><PeticionPendiente peticion={peticion} aceptar={() => FriendsService.aceptFriendRequest(peticion.webid, webId)} rechazar={() => FriendsService.deleteFriendRequest(peticion.webid, webId)} /></li>
  );
  return (
    <ul className="list">
      {listItems}
    </ul>
  )
}

export const PeticionPendiente = ({ peticion, aceptar, rechazar }) => {
  var nombre = peticion.nombreUsuario
  var webId = peticion.webid
  var accept = aceptar
  var refuse = rechazar
  return (
    <div className="card" >
      <div>
        <h4 className="peticiones">
          <Name src={nombre} > {nombre} </Name>
        </h4>
        <center>
          <div className="botones">
            <Button variant="contained" className="buttoncard" name="Aceptar" id="botonOpcionA" value={webId} datatype="button" onClick={accept}>Aceptar</Button>' +
              <Button variant="contained" className="buttoncard" name="Eliminar" id="botonOpcionE" value={webId} datatype="button" onClick={refuse}>Eliminar</Button>' +
            </div>
        </center>
      </div>
    </div>
  )
}
export const Card = ({distanciasAmigos,nombre}) => {
  const webId = useWebId();
  const FriendsService = ServicesFactory.forFriendUsers(webId);
  var user = "" + useWebId();
  return (
    <div className="card" >
      <div>
        <h4 className="amigos">
          <Name src={nombre}>{nombre}</Name>
        </h4>
        <center>
          <div className="botones">
            <Button variant="contained" className="buttoncard" id="botonOpcionP"><Link to="/mapa">{distanciasAmigos[nombre]}</Link></Button>
            <Button variant="contained" className="buttoncard" id="botonOpcionD" datatype="button" onClick={() => FriendsService.deleteFriend(nombre, user)} >Delete</Button>
          </div>
        </center>
      </div>
    </div>
  );
};