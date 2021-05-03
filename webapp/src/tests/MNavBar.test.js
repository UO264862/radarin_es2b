import React from 'react'
import { render} from "@testing-library/react";
import MNavBar from "../ui/MNavBar";
import { BrowserRouter } from 'react-router-dom';

test('Comprobar que todo se renderiza correctamente', async () => {
    const { getByText } = render(<BrowserRouter><MNavBar/></BrowserRouter>);
    expect(getByText("Mapa")).toBeInTheDocument();
    expect(getByText("Perfil")).toBeInTheDocument();
    expect(getByText("Acerca de")).toBeInTheDocument();
  });
