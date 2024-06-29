import { expect } from "vitest";
import validationService from "../src/services/validation.helper";

const mockEmail = "email@e.com";
const mockPassword = "Password1*";
const mockEmail2 = "emaile.com";
const mockPassword2 = "Password";

describe("Validator tests", () => {

    it("should return true if the email is valid", async () => {

        const res = validationService.validEmail(mockEmail);

        expect(res).toEqual(true);
    });

    it("should return false if the email is invalid", async () => {

        const res = validationService.validEmail(mockEmail2);

        expect(res).toEqual(false);
    });


    it("should return true if the password is valid", async () => {

        const res = validationService.validPassword(mockPassword);

        expect(res).toEqual(true);
    });

    it("should return false if the password is valid", async () => {

        const res = validationService.validPassword(mockPassword2);

        expect(res).toEqual(false);
    });

    it("should return true if the input is valid", async () => {

        const res = validationService.required(mockEmail);

        expect(res).toEqual(true);
    });

    it("should return false if the input is invalid", async () => {

        const res = validationService.required("");

        expect(res).toEqual(false);
    });
});