import UpdateCurrentUserCoordinates from "./UpdateCurrentUserCoordinates";

test("Comprobar que funciona correctamente", async () => {
    var upd=new UpdateCurrentUserCoordinates("webid","2,2");
    expect(upd.webId).toBe("webid");
    expect(upd.coordinates).toBe("2,2");
    expect(upd.isWebIdInvalid()).toBe(true); 
    expect(upd.isUsernamePresent()).toBe(true); 
});
