import React from 'react'
import { render, fireEvent, getByText } from "@testing-library/react";
import Perfil from "../ui/Profile";

test('Comprobar que todo se renderiza correctamente', async () => {
   render(<Perfil/>);
});
