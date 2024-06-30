import { expect } from "chai";
import sinon from "sinon";
import User from "../src/models/user.model.js";  
import { addUserService, editPasswordService, loginUserService } from "../src/services/users.services.js"; 
import bcrypt from 'bcrypt'

describe('Testing requests on database', () => {
   
    let testUser, editTestUser, error, wrongLoginTestUser, wrongEditTestUser, loginTestUser; 
    beforeEach(() => {
        testUser = { 
            save: sinon.stub().resolves({ username: "ff", email: "f@f.com", password: "ee" }),
            email: "f@f.com",
            username: "ff",
            password: "hashedpassword",
            _id: "1" 
        },  
        wrongLoginTestUser = { email: "f@f.com", password: "eeff" },
        loginTestUser = { email: "f@f.com", password: "ee" },
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

        it('should create a new user successfully', async () => { 
            const bcryptStub = sinon.stub(bcrypt, 'hashSync');
            bcryptStub.returns('hashedpassword'); 
            const saveStub = sinon.stub(User.prototype, "save");
            saveStub.returns(testUser);

            // Act
            const result = await addUserService(testUser);

            // Assert
            expect(bcrypt.hashSync.calledWith('hashedpassword', 8)).to.be.true;
            expect(saveStub.calledOnce).to.be.true; 
            expect(result).to.equal(testUser);

            saveStub.restore();
            bcryptStub.restore();
        });

        it('should throw an error if bcrypt hashing fails', async () => {
            // Arrange
            const bcryptStub = sinon.stub(bcrypt, 'hashSync');
            const error = new Error('Hashing failed');
            bcryptStub.throws(error);
 
            try {
                const result = await addUserService(testUser);
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            }  

            bcryptStub.restore();
        });
    });

    describe("editPasswordtests", () => { 
        it("should call findOneAndUpdate on the User model", async () => { 
            const findOneAndUpdateStub = sinon.stub(User, "findOneAndUpdate");
            findOneAndUpdateStub.resolves(testUser); 
            const userId = testUser._id;
            const newPassword = "new";

            const result = await editPasswordService({userId, newPassword});


            expect(findOneAndUpdateStub.calledOnce).to.be.true;  
            findOneAndUpdateStub.restore();
        }); 

        it("should throw an error when findOneAndUpdate fails", async () => { 
            const findOneAndUpdateStub = sinon.stub(User, "findOneAndUpdate");
            findOneAndUpdateStub.throws(error); 
            const userId = testUser._id;
            const newPassword = "new";

            try { 
                const result = await editPasswordService({userId, newPassword}); 
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            }  

            findOneAndUpdateStub.restore();
        });  
    });


    describe("logIntests", () => { 
        it("should call findOne and correctly returns on the User model", async () => { 
            const findOneStub = sinon.stub(User, "findOne");
            const bcryptStub = sinon.stub(bcrypt, 'compareSync');
            findOneStub.resolves(testUser); 
            bcryptStub.returns(true);

            const result = await loginUserService(loginTestUser);

            expect(findOneStub.calledOnce).to.be.true; 
            expect(bcryptStub.calledOnce).to.be.true; 
            expect(result).to.equal(testUser);

            findOneStub.restore();
            bcryptStub.restore();
        });

        it("should throw an error when findone fails", async () => { 
            const findOneStub = sinon.stub(User, "findOne");
            const bcryptStub = sinon.stub(bcrypt, 'compareSync');
            findOneStub.throws(error); 
            bcryptStub.returns(true);

            try {
                await loginUserService(loginTestUser);
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            }  

            findOneStub.restore();
            bcryptStub.restore();
        });  

        it("should return null when login is wrong", async () => {
            const findOneStub = sinon.stub(User, "findOne");
            const bcryptStub = sinon.stub(bcrypt, 'compareSync');
            findOneStub.resolves(testUser); 
            bcryptStub.returns(false);

            const result = await loginUserService(wrongLoginTestUser);
            expect(result).to.be.null;

            findOneStub.restore();
            bcryptStub.restore();
        });  

    });
});