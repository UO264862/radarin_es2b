import React from 'react'
import { render, fireEvent, getByText } from "@testing-library/react";
import About from "./About";

test('Comprobar que todo se renderiza correctamente', async () => {
    const { getByText } = render(<About/>);
    expect(getByText("¿Qué es Radarin?")).toBeInTheDocument();
    expect(getByText("Radarin será un sistema para facilitar encuentros entre amigos utilizando nuevas tecnologías. La aplicación podrá acceder a la información de localización del teléfono móvil de los usuarios que voluntariamente la tengan activada y permitirá que otros usuarios que sean sus amigos puedan conocer cuándo están cerca.")).toBeInTheDocument();
  });
