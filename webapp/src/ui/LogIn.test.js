import React from 'react'
import { render} from "@testing-library/react";
import App from "../App";

test('Comprobar que todo se renderiza correctamente', async () => {
    const { getByText } = render(<App/>);
    expect(getByText("Log in")).toBeInTheDocument();
    expect(getByText("Accede como administrador")).toBeInTheDocument();
  });
