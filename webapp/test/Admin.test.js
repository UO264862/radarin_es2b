import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Admin, { ListaUsuarios, Usuario } from "./Admin";
import "@testing-library/jest-dom/extend-expect";
import {jest} from "@jest/globals";

test("Comprobar que todo se renderiza correctamente", async () => {
    const { getByText } = render(<Admin/>);
    expect(getByText("Mostrar Usuarios")).toBeInTheDocument();
    expect(getByText("Administrar Usuarios")).toBeInTheDocument();
  });

test("Comprobar que se ejecuta la function del boton mostrar usuarios", () => {
  const mockHandler = jest.fn();
  const component = render(<Admin method={mockHandler}/>);
  const boton = component.getByText("Mostrar Usuarios");
  fireEvent.click(boton);
  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("Comprobar que se renderiza bien el listado", () =>{
  const component = render(<ListaUsuarios usauriosOpcional={[{nombreUsuario: "usuario1",
    webid : "webId1"}]}/>);
    expect(component.getByText("Desbloquear")).toBeInTheDocument();
    expect(component.getByText("Bloquear")).toBeInTheDocument();
    expect(component.getByText("WebId:")).toBeInTheDocument();
    expect(component.getByText("Usuario:")).toBeInTheDocument();
})

test("Comprobar que se ejecuta la funcion de los botones desbloquear y bloquear", () =>{
  const mockHandler1 = jest.fn();
  const mockHandler2 = jest.fn();
  const component = render(<Usuario usuario={{nombreUsuario: "usuario1",
webid : "webId1"}} desbloquear={mockHandler1} bloquear={mockHandler2}/>);
  const boton1 = component.getByText("Desbloquear");
  const boton2 = component.getByText("Bloquear");
  fireEvent.click(boton1);
  expect(mockHandler1.mock.calls).toHaveLength(1);
  fireEvent.click(boton2);
  expect(mockHandler2.mock.calls).toHaveLength(1);
})

