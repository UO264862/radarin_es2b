import PersistenceFactory from "./PersistenceFactory";
import UserGateway from "./user/UserGateway";

test('Comprobar que la factoria funciona correctamente', async () => {
    expect(PersistenceFactory.forUser()).toStrictEqual(new UserGateway()); 
});
