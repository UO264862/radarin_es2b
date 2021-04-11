// Dependences from: ~/domain/currentUser
import { UserDTO } from '../UserDTO';
import CurrentUserFactory from './CurrentUserFactory';

class CurrentUserService {

    constructor() {
        this.currentUserFactory = new CurrentUserFactory();
    }

    async getLoggedUser(username) {
        // Get coordinates from navigator
        let position = this.currentUserFactory.forGetCurrentUserCoords();

        if (position != null) {
            // Update coordinates in the database
            // let done = await this.currentUserFactory.forUpdateCurrentUserCoordinates(webId, position);

            // if (!done)
            //     console.log("Error al actualizar las coordenadas en la base de datos");

            // let user = await this.currentUserFactory.forGetUsernameByWebId(webId);

            return new UserDTO({ username: username, latitude: position.lat, longitude: position.lng });
        } else {
            console.log("Error al obtener la ubicación");
            return this.getDefaultUser();
        }
    }

    getDefaultUser() {
        // Get coordinates from navigator
        let position = this.currentUserFactory.forGetCurrentUserCoords();

        return new UserDTO({ username: "¿Tú?", latitude: parseFloat(position.lat), longitude: parseFloat(position.lng) });
    }

    getFriends() {
        // TO DO
        // Se han establecido valores por defecto para la presentación del prototipo
        return [
            /* Usuario en la Facultad de Ciencias de Oviedo */
            new UserDTO({ username: "winetsunamisealion", latitude: 43.357647897150976, longitude: -5.853398968683256 }),
            /* Usuario en el Parque de Invierno de Oviedo */
            new UserDTO({ username: "monkeybeetfishorange", latitude: 43.35172405394816, longitude: -5.853235079946685 }),
            /* Usuario en la Facultad Padre Ossó de Oviedo */
            new UserDTO({ username: "operaryegroundhogday", latitude: 43.35652285126186, longitude: -5.845319804493103 })
        ];
    }
}

export default CurrentUserService;