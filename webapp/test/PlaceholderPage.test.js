import React from 'react'
import { render, fireEvent, getByText } from "@testing-library/react";
import PlaceholderPage from "./PlaceholderPage";

test('Comprobar que todo se renderiza correctamente', async () => {
    const { getByText } = render(<PlaceholderPage/>);
    expect(getByText("Bienvenido a Radarin")).toBeInTheDocument();
    expect(getByText("Busca amigos")).toBeInTheDocument();
  });
