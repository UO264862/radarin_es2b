// Dependences from: ~/domain/currentUser
import { UserDTO } from '../UserDTO';
import CurrentUserFactory from './CurrentUserFactory';
import FriendsService from "../friends/FriendUsersService";
import { getUsuarioByWebId } from '../../api/api';

class CurrentUserService {

    constructor() {
        this.currentUserFactory = new CurrentUserFactory();
    }

    async getLoggedUser(username) {
        // Get coordinates from navigator
        let position = this.currentUserFactory.forGetCurrentUserCoords();

        if (position != null) {
            return new UserDTO({ username: username, latitude: position.lat, longitude: position.lng });
        } else {
            return this.getDefaultUser();
        }
    }

    getDefaultUser() {
        let position = this.currentUserFactory.forGetCurrentUserCoords();
        if(position==null){
            position={lat:0,lng:0};
        }
        return new UserDTO({ username: "Tú", latitude: parseFloat(position.lat), longitude: parseFloat(position.lng) });
    }

    async getFriends(webId) {
        var amigos = await new FriendsService(webId).obtenerAmigos();
        var lista = [];
        for(const webidAmigo of amigos){
            var amigo = await getUsuarioByWebId(webidAmigo);
            var coordenadas = amigo.coordinates.split(",");
            lista.push(new UserDTO({ username: amigo.nombreUsuario, latitude: coordenadas[0], longitude: coordenadas[1] }))
        }
        return lista;
    }

    
}

export default CurrentUserService;