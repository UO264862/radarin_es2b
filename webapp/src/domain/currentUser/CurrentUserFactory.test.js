import CurrentUserFactory from "./CurrentUserFactory";
import GetCurrentUserCoords from "./strategies/GetCurrentUserCoords";
import GetUsernameByWebId from "./strategies/GetUsernameByWebId";
import UpdateCurrentUserCoordinates from "./strategies/UpdateCurrentUserCoordinates";

test("Comprobar que la factoria funciona correctamente", async () => {
    expect(new CurrentUserFactory().forGetCurrentUserCoords()).toStrictEqual((new GetCurrentUserCoords()).execute());
    expect(new CurrentUserFactory().forGetUsernameByWebId("webid")).toStrictEqual((new GetUsernameByWebId("webid")).execute()); 
    expect(new CurrentUserFactory().forUpdateCurrentUserCoordinates("webid", "2,2")).toStrictEqual((new UpdateCurrentUserCoordinates("webid", "2,2")).execute());
});
