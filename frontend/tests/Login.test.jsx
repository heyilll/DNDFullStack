import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; 
import { expect } from "vitest";
import Login from "../src/components/Login";
import accService from "../src/services/account.service";

vi.mock("../src/services/account.service.js");

describe("Login page tests", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>  
                <Login />
            </BrowserRouter>);
    });

    it("should render the login screen", async () => {
        const email = screen.getByText("Email");
        const password = screen.getByText("Password");
        const register = screen.getByText("Register here");
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(register).toBeInTheDocument();
    });

    it("should render the login screen", async () => {
        accService.getCurrentUser.mockResolvedValue({user: {
            email:"ed@email.com",
            password:"Password1*"
        }})   
 
        expect(accService.getCurrentUser).toHaveBeenCalled(); 
    });
});