import React from "react";
import { render } from "@testing-library/react";
import EnviosTracker from "./EnviosTracker.jsx";

describe("EnviosTracker Component", () => {
  it("debe renderizar el título con el número de pedido", () => {
    const { getByText } = render(
      <EnviosTracker orderId="12345" deliveryDate="2025-10-20" />
    );
    expect(getByText(/Tracking de Pedido #12345/i)).toBeTruthy();
  });
});
