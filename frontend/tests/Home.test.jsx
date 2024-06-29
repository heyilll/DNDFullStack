import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; 
import { expect } from "vitest";
import Home from "../src/components/Home";

describe("Home page tests", () => {
  beforeEach(() => {
      render(
        <BrowserRouter>  
            <Home />
        </BrowserRouter>);
  });

  it("should render Tell me about... ", async () => {
    const homeHeading = screen.getByText("Build your next campaign");
    expect(homeHeading).toBeInTheDocument();
  });
});