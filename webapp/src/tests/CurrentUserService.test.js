import CurrentUserService from "../domain/currentUser/CurrentUserService";
import "@testing-library/jest-dom/extend-expect";
import { UserDTO } from "../domain/UserDTO";

test ("comprobar que el currentUserService funciona correctamente", async () => {
  var currentUserService = new CurrentUserService()
  var user = new UserDTO({ username: "Tú", latitude: parseFloat("0"), longitude: parseFloat("0")})
  expect(currentUserService.getDefaultUser()).toStrictEqual(user);
  expect(await currentUserService.getLoggedUser()).toStrictEqual(user);
  var lista=[];
  expect(await currentUserService.getFriends("webid")).toStrictEqual(lista);
});