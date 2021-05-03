import GetCurrentUserCoords from "../domain/currentUser/strategies/GetCurrentUserCoords";

test("Comprobar que funciona correctamente", async () => {
    var gcuc=new GetCurrentUserCoords();
    expect(await gcuc.execute()).toBe(null); 
});
