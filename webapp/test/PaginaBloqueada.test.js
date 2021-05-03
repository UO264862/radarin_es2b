import React from 'react'
import { render, fireEvent, getByText } from "@testing-library/react";
import PaginaBloqueada from "./PaginaBloqueada";

test('Comprobar que todo se renderiza correctamente', async () => {
    const { getByText } = render(<PaginaBloqueada/>);
    expect(getByText("Tu cuenta ha sido bloqueada")).toBeInTheDocument();
    expect(getByText("Si crees que ha sido un error, ponte en contacto con un administrador")).toBeInTheDocument();
  });
