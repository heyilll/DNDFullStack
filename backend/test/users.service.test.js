import { expect } from "chai";
import sinon from "sinon";
import User from "../src/models/user.model.js";  
import { addUserService, loginUserService } from "../src/services/users.services.js"; 

describe('Testing requests on database', () => {
   
    let testUser, editTestUser, error, wrongLoginTestUser, wrongEditTestUser; 
    beforeEach(() => {
        testUser = { 
            save: sinon.stub().resolves({ username: "ff", email: "f@f.com", password: "ee" }),
            email: "f@f.com",
            username: "ff",
            password: "eestdd"
        },
        editTestUser = { email: "f@f.com", password: "eestdd", newpassword: "ee" }, 
        wrongEditTestUser = { email: "f@f.com", password: "ee ", newpassword: "ee" },
        wrongLoginTestUser = { email: "f@f.com", password: "ee" },
        error = new Error();     
    });

    describe("addUsertests", () => {
        it("should call save on the User model", async () => { 
            const saveStub = sinon.stub(User.prototype, "save");
            saveStub.returns(testUser);

            const result = await addUserService(testUser);

            expect(saveStub.calledOnce).to.be.true; 
            expect(result).to.equal(testUser);
            saveStub.restore();
        });

        it("should throw an error when save fails", async () => { 
            const saveStub = sinon.stub(User.prototype, "save");
            saveStub.throws(error);

            try {
                await addUserService(testUser);
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            } 

            saveStub.restore();
        });
    });

    // describe("editUserPasswordtests", () => { 
    //     it("should call findOne and save on the User model", async () => { 
    //         const findOneStub = sinon.stub(User, "findOne");
    //         findOneStub.resolves(testUser); 

    //         await editUserPasswordService(editTestUser);

    //         expect(findOneStub.calledOnce).to.be.true;
    //         expect(testUser.save.calledOnce).to.be.true;

    //         findOneStub.restore();
    //     });

    //     it("should return true when the password is successfully changed", async () => {   
    //         const findOneStub = sinon.stub(User, "findOne");
    //         findOneStub.resolves(testUser);

    //         const result = await editUserPasswordService(editTestUser);

    //         expect(result).to.equal(true);
    //         expect(testUser.password).to.equal("ee");

    //         findOneStub.restore();
    //     });

    //     it("should return null when login is wrong", async () => {
    //         const findOneStub = sinon.stub(User, "findOne");
    //         findOneStub.resolves(testUser); 

    //         const result = await editUserPasswordService(wrongEditTestUser);
    //         expect(result).to.be.null;

    //         findOneStub.restore();
    //     });  

    //     it("should throw an error when findone fails", async () => { 
    //         const findOneStub = sinon.stub(User, "findOne");
    //         findOneStub.throws(error); 

    //         try {
    //             await editUserPasswordService(editTestUser);
    //             assert.fail("It should have thrown an error.")
    //         } catch (err) {
    //             expect(err).to.equal(error);
    //         }  

    //         findOneStub.restore();
    //     }); 

    //     it("should throw an error when save fails", async () => { 
    //         testUser = {
    //             save: sinon.stub().throws(error),
    //             email: "f@f.com",
    //             password: "eestdd"
    //         };
    //         const findOneStub = sinon.stub(User, "findOne");
    //         findOneStub.resolves(testUser);

    //         try {
    //             await editUserPasswordService(editTestUser);
    //             assert.fail("It should have thrown an error.")
    //         } catch (err) {
    //             expect(err).to.equal(error);
    //         } 

    //         findOneStub.restore();
    //     });
    // });


    describe("logIntests", () => { 
        it("should call findOne and correctly returns on the User model", async () => { 
            const findOneStub = sinon.stub(User, "findOne");
            findOneStub.resolves(testUser); 

            const result = await loginUserService(testUser);

            expect(findOneStub.calledOnce).to.be.true; 
            expect(result).to.equal(testUser);

            findOneStub.restore();
        });

        it("should throw an error when findone fails", async () => { 
            const findOneStub = sinon.stub(User, "findOne");
            findOneStub.throws(error); 

            try {
                await loginUserService(testUser);
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            }  

            findOneStub.restore();
        });  

        it("should return null when login is wrong", async () => {
            const findOneStub = sinon.stub(User, "findOne");
            findOneStub.resolves(testUser); 

            const result = await loginUserService(wrongLoginTestUser);
            expect(result).to.be.null;

            findOneStub.restore();
        });  

    });
});