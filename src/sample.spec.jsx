import React from "react";
import { render, screen } from "@testing-library/react";

function HelloWorld() {
  return <h1>Hola, Mundo Pastelero 🍰</h1>;
}

describe("Prueba inicial de entorno", () => {
  it("renderiza el componente correctamente", () => {
    render(<HelloWorld />);
    expect(screen.getByText(/Hola, Mundo Pastelero/)).toBeTruthy();
  });
});
