import React from 'react'
import { render, fireEvent, getByText } from "@testing-library/react";
import Friends from "./Friends";

test('check that everything is rendering propertly', async () => {
    const { getByText } = render(<Friends/>);
    expect(getByText("Añadir Amigos")).toBeInTheDocument();
    expect(getByText("Lista de peticiones de amistad")).toBeInTheDocument();
    expect(getByText("Lista de amigos")).toBeInTheDocument();
  });


