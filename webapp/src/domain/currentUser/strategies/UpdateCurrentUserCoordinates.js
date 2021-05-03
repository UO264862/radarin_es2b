// Persistence dependences
import { modificarCoordenadas, getUsernameByWebId } from "../../../api/api";

class UpdateCurrentUserCoordinates {

    constructor(webId, coordinates) {
        this.webId = webId;
        this.coordinates = coordinates;
    }

    execute() {
        if (!this.isWebIdInvalid() || !(this.isUsernamePresent()))
            return false;
        return modificarCoordenadas(this.webId, this.coordinates);
    }

    isWebIdInvalid() {
        return (this.webId != null);
    }

    isUsernamePresent() {
        let username = getUsernameByWebId(this.webId);
        return (username != null);
    }
}

export default UpdateCurrentUserCoordinates;