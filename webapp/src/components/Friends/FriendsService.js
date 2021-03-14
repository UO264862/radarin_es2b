import auth from "solid-auth-client";
import data from "@solid/query-ldflex";

// import {login,getDefaultSession}from "@inrupt/solid-client-authn-browser";
import FC from "solid-file-client";
// import { NotificationManager } from "react-notifications";
import { toast } from 'react-toastify';

import FileClient from "solid-file-client";

class FriendService {
  constructor() {
    this.webId = "";
    this.friends = this.getFriends();
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
        } else {
          await user.knows.add(data[friendWebId]); //añadimos el amigo
          toast.info("Your friend has been added", {
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

  async deleteFriend(friend, userWebId) {
    var friendWebId = friend.nombre;
    friendWebId = friendWebId.replace("[", "");
    friendWebId = friendWebId.replace("]", "");


    const user = data[userWebId];
    if (await this.isWebIdValid(friendWebId)) {
      if (friendWebId.localeCompare("") !== 0) {
        if (await !this.friendAlreadyAdded(friendWebId, userWebId)) {
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

  async friendAlreadyAdded(id, webId) {
    const user = data[webId];
    for await (const friend of user.friends)
      if (String(friend).localeCompare(String(id)) === 0) return true;
    return false;
  }


  async friendAlreadyAdded(friendWebId, webId) {
    const user = data[webId];
    for await (const friend of user.friends) {
      if (String(friend).localeCompare(String(friendWebId)) === 0) { return true; }

    }
    return false;
  };


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
export default FriendService = new FriendService();
