import GetUsernameByWebId from "../domain/currentUser/strategies/GetUsernameByWebId";

test("Comprobar que funciona correctamente", async () => {
    var gubw=new GetUsernameByWebId("webid");
    expect(gubw.webId).toBe("webid");
});
