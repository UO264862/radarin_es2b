import UserGateway from "./UserGateway";

test('Comprobar que la factoria funciona correctamente', async () => {
   var userGateway=new UserGateway();
   expect(await userGateway.getUsername("webid")).toStrictEqual(undefined);
   expect(await userGateway.updateCoords("webid","30,30")).toStrictEqual(undefined);
});
