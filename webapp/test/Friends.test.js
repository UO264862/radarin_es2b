import React from "react"
import { render, fireEvent} from "@testing-library/react";
import { Friends, ListaPeticionesCompletadas, ListaPeticionesPendientes, PeticionCompletada, PeticionPendiente } from "./Friends";
import {jest} from "@jest/globals"

test("Comprobar que todo se renderiza correctamente", async () => {
  const component = render(<Friends/>);
    expect(component.getByText("Añadir Amigos")).toBeInTheDocument();
    expect(component.getByText("Lista de peticiones de amistad")).toBeInTheDocument();
    expect(component.getByText("Lista de amigos")).toBeInTheDocument();
    

  });
test("Comprobar que se rendereriza correctamente las peticiones pendientes", () => {
  const component = render(<ListaPeticionesPendientes peticionesOpcional={[{nombreUsuario: "usuario1",webid: "webId1"},{nombreUsuario: "usuario2",webid: "webId2"}]}/>);
  expect(component.getByText("usuario1")).toBeInTheDocument();
  expect(component.getByText("usuario2")).toBeInTheDocument();
});
test("Comprobar que funcionan los botones correctamentes a las peticiones pendientes", () => {
  const mockHandler1 = jest.fn();
  const mockHandler2 = jest.fn();
  const component = render(<PeticionPendiente peticion={{nombreUsuario: "usuario1",webid: "webId1"}} aceptar={mockHandler1} rechazar={mockHandler2}/>);
  const boton1 = component.getByText("Aceptar");
  const boton2 = component.getByText("Eliminar");
  fireEvent.click(boton1);
  fireEvent.click(boton2);
  expect(mockHandler1.mock.calls).toHaveLength(1);
  expect(mockHandler2.mock.calls).toHaveLength(1);
});
test("Comprobar que se rendereriza correctamente las peticiones completadas", () => {
  const component = render(<ListaPeticionesCompletadas peticionesOpcional={[{nombreUsuario: "usuario1",webid: "webId1"},{nombreUsuario: "usuario2",webid: "webId2"}]}/>);
  expect(component.getByText("usuario1")).toBeInTheDocument();
  expect(component.getByText("usuario2")).toBeInTheDocument();
});
test("Comprobar que funciona el boton correctamente a las peticiones completas", () => {
  const mockHandler = jest.fn();
  const component = render(<PeticionCompletada peticion={{nombreUsuario: "usuario1",webid: "webId1"}} confirmar={mockHandler}/>);
  const boton = component.getByText("Confirmar");
  fireEvent.click(boton);
  expect(mockHandler.mock.calls).toHaveLength(1);
});