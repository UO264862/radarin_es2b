import CurrentUserFactory from "../src/domain/currentUser/CurrentUserFactory";
import GetCurrentUserCoords from "../src/domain/currentUser/strategies/GetCurrentUserCoords";
import GetUsernameByWebId from "../src/domain/currentUser/strategies/GetUsernameByWebId";
import UpdateCurrentUserCoordinates from "../src/domain/currentUser/strategies/UpdateCurrentUserCoordinates";

test("Comprobar que la factoria funciona correctamente", async () => {
    expect(new CurrentUserFactory().forGetCurrentUserCoords()).toStrictEqual((new GetCurrentUserCoords()).execute());
    expect(new CurrentUserFactory().forGetUsernameByWebId("webid")).toStrictEqual((new GetUsernameByWebId("webid")).execute()); 
    expect(new CurrentUserFactory().forUpdateCurrentUserCoordinates("webid", "2,2")).toStrictEqual((new UpdateCurrentUserCoordinates("webid", "2,2")).execute());
});
