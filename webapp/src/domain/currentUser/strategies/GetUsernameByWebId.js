import { getUsernameByWebId } from "../../../api/api"

class GetUsernameByWebId {

    constructor(webId) {
        this.webId = webId;
    }

    async execute() {
        return await getUsernameByWebId(this.webId);
    }
}

export default GetUsernameByWebId;