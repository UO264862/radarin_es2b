import FriendUsersService from "../domain/friends/FriendUsersService";
import "@testing-library/jest-dom/extend-expect";

test ("comprobar que el friendUsersService funciona correctamente", async () => {
  var friendUsersService = new FriendUsersService("webid")
  var lista=[]
  expect(await friendUsersService.isAmigo("webid")).toBe(false);
  expect(await friendUsersService.isWebIdValid("webid")).toBe(undefined);
  expect(await friendUsersService.obtenerAmigos()).toStrictEqual(lista);
});