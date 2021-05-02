import { UserDTO } from "./UserDTO";
import "@testing-library/jest-dom/extend-expect";
import { latLng } from 'leaflet';

test ("comprobar que el userDTO funciona correctamente", async () => {
  var userDTOtest = new UserDTO({ username: "pedro", latitude: parseFloat("58"), longitude: parseFloat("45")})
  var userDTOtest2 = new UserDTO({ username: "pedro", latitude: null, longitude: parseFloat("45")})
  expect(userDTOtest.username).toBe("pedro");
  expect(userDTOtest.toString()).toBe("Nombre de usuario: pedro\n\tLatitude: 58\n\tLongitude: 45");
  expect(userDTOtest.getCoordinates()).toStrictEqual({latitude: 58, longitude: 45});
  expect(userDTOtest.getLatLng()).toStrictEqual(latLng(58, 45));
  expect(userDTOtest2.getLatLng()).toStrictEqual(latLng(0, 0));
});