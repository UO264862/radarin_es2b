import ServicesFactory from "../domain/ServicesFactory";
import CurrentUserService from "../domain/currentUser/CurrentUserService";
import FriendsService from "../domain/friends/FriendUsersService";

test('Comprobar que la factoria funciona correctamente', async () => {
    expect(ServicesFactory.forCurrentUser()).toStrictEqual(new CurrentUserService());
    expect(ServicesFactory.forFriendUsers("webid").toString()).toStrictEqual(new FriendsService("webid").toString()); 
});
