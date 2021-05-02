const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/admin-acceder.feature");

defineFeature(feature, (test) => {
  
  beforeEach(async () => {
    await global.page.goto("https://radarines2bwebapp.herokuapp.com/");
  });

  test("El usuario hace click sobre accede como admin", ({when,then}) => {
    

    when("El usuario pulsa el enlace", async () => {
      await expect(global.page).toClick("a",{href: "/radmin"});
    });

    then("Se espera que se cargue la pantalla de acceso", async () => {
        await expect(global.page).toMatch("Acceder");
        await expect(global.page).toMatch("Volver");
        await expect(global.page).toMatch("Registrate como admin");
    });
  });
});