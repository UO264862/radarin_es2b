// import {login,getDefaultSession}from "@inrupt/solid-client-authn-browser";
// import { NotificationManager } from "react-notifications";

// External dependences
import auth from "solid-auth-client";
import data from "@solid/query-ldflex";
import FC from "solid-file-client";
import { toast } from 'react-toastify';
import FileClient from "solid-file-client";
import { addFriendRequest, getWebIdByUsername, eliminarSolicitud, aceptarSolicitud, getSolicitudesCompletadas, getSolicitudesPendientes } from "../../api/api";

class FriendsService {

  constructor() {
    this.webId = "";
    this.friends = this.getFriends();
  }
  //Enviar una peticion de amistad al usuario
  async addFriendRequestService(friendUsername, userWebId) {
    //obtenemos la webId del usuario que hemos introducido
    let friendWebId;
    getWebIdByUsername(friendUsername).then((resultado) => friendWebId = resultado);
    //si no existe ese usuario en nuestra base de datos
    if (!friendWebId) {
      //sacamos notificacion de que no se ha encontrado el usuario
      toast.info("Usuario no encontrado", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000
      });
      //si se ha encontrado un usuario con ese username
    } else {
      //si no es amigo
      if (this.isAmigo(friendWebId)) {
        //creamos en una entrada en la tabla peticiones con los dos webId
        addFriendRequest(userWebId, friendWebId);
        //sacamos notificacion de que se ha enviado la peticion
        toast.info("Tu peticion de amigo ha sido enviada", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000
        });
      }
    }
  }
  // denegar la peticion de amistad
  async deleteFriendRequest(webIdSolicitante, webIdSolicitado) {
    //si no es amigo
    if (this.isAmigo(webIdSolicitado)) {
      //eliminar de base de datos la entrada a la tabla
      eliminarSolicitud(webIdSolicitante, webIdSolicitado)
      toast.info("La petición ha sido eliminada", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000
      });
    }
  }
  // aceptar la peticion de amistad y añadir por parte de solicitado al solicitante
  async aceptFriendRequest(webIdSolicitante, webIdSolicitado) {
    //si no es amigo
    if (this.isAmigo(webIdSolicitado)) {
      //añadimos al amigo
      if (await this.addFriend(webIdSolicitante, webIdSolicitado)) {
        //cambiamos la entrada de la tabla peticiones
        aceptarSolicitud(webIdSolicitante, webIdSolicitado);
        //sacamos notificacion de que no se ha encontrado el usuario
        toast.info("El usuario se ha añadido a tu lista de amigos", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000
        });
      }
    }
  }
  // confirmar la peticion de amistad y añadir por parte del solicitante al solicitado
  async confirmFriendRequest(webIdSolicitante, webIdSolicitado) {
    //si no es amigo
    if (this.isAmigo(webIdSolicitado)) {
      //añadimos al amigo
      if (await this.addFriend(webIdSolicitante, webIdSolicitado)) {
        //cambiamos la entrada de la tabla peticiones
        eliminarSolicitud(webIdSolicitante, webIdSolicitado);
        //sacamos notificacion de que no se ha encontrado el usuario
        toast.info("El usuario se ha añadido a tu lista de amigos", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000
        });
      }
    }
  }
  //comprobamos si es o no amigo
  async isAmigo(webId) {
    if (await this.getFriends()) {
      let isAmigo = (await (await this.getFriends()).find(webId));
      if (!isAmigo) {
        //sacamos notificacion de que no se ha encontrado el usuario
        toast.info("El usuario no es tu amigo", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000
        });
        return false;
      } else {
        return true;
      }
    } return false
  }

  getPeticionesCompletadas() {
    var peticiones=[];
    let lista=[]
    getSolicitudesCompletadas().then((result) => peticiones = result)
    for (const peticion of peticiones){
      if(peticion)
        lista.push(peticion)
    }
    return peticiones;
  }

  getPeticionesPendientes() {
    var peticiones=[];
    let lista=[]
    getSolicitudesPendientes().then((result) => peticiones = result)
    for (const peticion of peticiones){
      if(peticion)
        lista.push(peticion)
    }
    return peticiones;
  }

  async addFriend(friendWebId, userWebId) {
    let user = data[userWebId]; //sacamos nuestra informacion
    if (await this.isWebIdValid(friendWebId)) {
      if (friendWebId.localeCompare("") !== 0) {
        //comprobamos que no pasamos un campo vacio
        if (await this.friendAlreadyAdded(friendWebId, userWebId)) {
          //notificamos si el amigo estaba añadido
          toast.error("Friend already added", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 5000
          });
          return false;
        } else {
          await user.knows.add(data[friendWebId]); //añadimos el amigo
          toast.info("Your friend has been added", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 5000

          });
          await this.sleep(5000);
          //this.reload();
          return true;
        }
      } else {
        toast.error("Empty string", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000

        });
        return false;
      }
    } else {
      toast.error("Invalid WebId ", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000

      });
      return false;
    }
  }

  async deleteFriend(friend, userWebId) {
    var friendWebId = friend.nombre;
    friendWebId = friendWebId.replace("[", "");
    friendWebId = friendWebId.replace("]", "");


    const user = data[userWebId];
    if (await this.isWebIdValid(friendWebId)) {
      if (friendWebId.localeCompare("") !== 0) {
        if (await !this.friendAllreadyAdded(friendWebId, userWebId)) {
          toast.error("An error occurred when deleting the friend (maybe it was previously deleted)", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 5000

          });

        } else {
          await user.knows.delete(data[friendWebId]); //añadimos el amigo
          toast.info("User will be deleted from your friends", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 5000

          });
          await this.sleep(5000);

          this.reload();
        }
      } else {
        toast.error("Empty string", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000

        });

      }
    } else {
      toast.error("Invalid WebId ", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000

      });

    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async isWebIdValid(friendWebId) {

    const fc = new FileClient(auth);
    let session = await auth.currentSession();
    if (!session) {
      session = await auth.login();
    }
    try {
      let op = async (client) => await client.itemExists(friendWebId);
      return await op(fc);
    } catch (e) {
      session = await auth.currentSession();
    }
  }

  async checkID(id) {
    const fc = new FC(auth);
    let session = await auth.currentSession();
    if (!session) {
      session = await auth.login();
    }
    try {
      let op = async (client) => await client.itemExists(id);
      return await op(fc);
    } catch (e) {
      session = await auth.currentSession();
    }
  }

  async friendAllreadyAdded(id, webId) {
    const user = data[webId];
    for await (const friend of user.friends)
      if (String(friend).localeCompare(String(id)) === 0) return true;
    return false;
  }
  async getFriends() {
    const friends = [];
    let session = await auth.currentSession();
    if (session) {
      var id = `${session.webId}`;
      const user = data[id];
      for await (const friend of user.friends) friends.push(friend.toString());
      const users = await Promise.all(friends);
      return users;
    }
  }
  reload = () => {
    window.location.reload();
  };

  async getSession() {
    let session = await auth.currentSession(localStorage);
    return session;
  };


  async getWebId() {

    let session = await this.getSession();
    let webId = session.webId;
    return webId;
  };

}

export default FriendsService;