import React from 'react'
import { render, fireEvent, getByText } from "@testing-library/react";
import RAdmin from "./RAdmin";

test('check that everything is rendering propertly', async () => {
    const { getByText } = render(<RAdmin/>);
    expect(getByText("Registrate como admin")).toBeInTheDocument();
    expect(getByText("Acceder")).toBeInTheDocument();
  });
