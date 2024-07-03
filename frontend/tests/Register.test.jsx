import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; 
import { expect } from "vitest";
import Register from "../src/components/Register";

describe("Register page tests", () => {
  beforeEach(() => {
      render(
        <BrowserRouter>  
            <Register />
        </BrowserRouter>);
  });

  it("should render the register screen", async () => {
    const email = screen.getByText("Email");
    const password = screen.getByText("Password");
    const username = screen.getByText("Username");
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });
});