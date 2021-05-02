import React from 'react'
import { render, fireEvent, getByText } from "@testing-library/react";
import LogIn from "./LogIn";

test('check that everything is rendering propertly', async () => {
    const { getByText } = render(<LogIn/>);
    expect(getByText("Log in")).toBeInTheDocument();
    expect(getByText("Accede como administrador")).toBeInTheDocument();
  });
