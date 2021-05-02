const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/admin-volver.feature");

defineFeature(feature, (test) => {
  
  beforeEach(async () => {
    await global.page.goto("https://radarines2bwebapp.herokuapp.com/");
  });

  test("El usuario hace click sobre volver para ir al login", ({when,then}) => {
    

    when("El usuario pulsa el enlace", async () => {
      await expect(global.page).toClick("a",{href: "/radmin"});
      await expect(global.page).toClick("a",{href: "/"});
    });

    then("Se espera que se cargue la pantalla de login", async () => {
        await expect(global.page).toMatch("Log in");
        await expect(global.page).toMatch("Accede como administrador");
    });
  });
});