import { expect } from "chai";
import sinon from "sinon";
import Character from "../src/models/character.model.js"; 
import { getCharactersService, getSpecificCharacterService, addCharacterService, removeCharacterService, editCharacterService } from "../src/services/character.services.js"; 
describe('Testing requests on database', () => {
    let testCharacter, error ; 
    beforeEach(() => {
        testCharacter = {  
            _id: "66807dc1840d5cb1c4cdc296",
            id: "668017fc7f2de206cfead3ec",
            name: "1",
            race: "elf",
            class: "bard",
            level: 15,
            created_by: "668017fc7f2de206cfead3ec" ,
            created_at: {
                "$date": "2024-06-29T21:33:53.335Z"
            } 
        } 
        error = new Error();     
    });

    describe("getCharacterstests", () => {
        it("should call find on the Character model", async () => {
            const findStub = sinon.stub(Character, "find");
            findStub.resolves(testCharacter);
            const userId = testCharacter.created_by;

            const result = await getCharactersService({ userId });

            expect(findStub.calledOnce).to.be.true;
            expect(result).to.equal(testCharacter);
            findStub.restore();
        });

        it("should throw an error when find fails", async () => {
            const findStub = sinon.stub(Character, "find");
            findStub.throws(error);
            const userId = testCharacter.created_by;

            

            try {
                const result = await getCharactersService({ userId });
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            } 
 
            findStub.restore();
        });
    });

    describe("getSpecificCharacterstests", () => {
        it("should call findOne on the Character model", async () => {
            const findOneStub = sinon.stub(Character, "findOne");
            findOneStub.resolves(testCharacter);
            const params = { id: testCharacter._id };
            const userId = testCharacter.created_by;

            const result = await getSpecificCharacterService({ params, userId });

            expect(findOneStub.calledOnce).to.be.true;
            expect(result).to.equal(testCharacter);
            findOneStub.restore();
        });

        it("should throw an error when findOne fails", async () => {
            const findOneStub = sinon.stub(Character, "findOne"); 
            findOneStub.throws(error);
            const params = { id: testCharacter._id };
            const userId = testCharacter.created_by;
 
            try {
                const result = await getSpecificCharacterService({params, userId });
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            } 
 
            findOneStub.restore();
        });
    });

    describe("addCharactertests", () => {
        it("should call save on the Character model", async () => {
            const saveStub = sinon.stub(Character.prototype, "save");
            saveStub.resolves(testCharacter);

            const result = await addCharacterService(testCharacter);

            expect(saveStub.calledOnce).to.be.true;
            expect(result).to.equal(testCharacter);
            saveStub.restore();
        });

        it("should throw an error when save fails", async () => {
            const saveStub = sinon.stub(Character.prototype, "save");
            saveStub.throws(error);

            try {
                const result = await addCharacterService(testCharacter);
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            } 
 
            saveStub.restore();
        });
    });

    describe("editCharactertests", () => {
        it("should call findOneAndUpdate on the Character model", async () => {
            const findOneAndUpdateStub = sinon.stub(Character, "findOneAndUpdate");
            findOneAndUpdateStub.resolves(testCharacter);
            const params = { id: testCharacter._id };
            const userId = testCharacter.created_by;
            const updateData = { name: 'Updated Character', description: 'New description' }; 

            const result = await editCharacterService({ params, userId, updateData });

            expect(findOneAndUpdateStub.calledOnce).to.be.true;
            expect(result).to.equal(testCharacter);
            findOneAndUpdateStub.restore();
        });

        it("should throw an error when findOneAndUpdate fails", async () => {
            const findOneAndUpdateStub = sinon.stub(Character, "findOneAndUpdate");
            findOneAndUpdateStub.throws(error);
            const params = { id: testCharacter._id };
            const userId = testCharacter.created_by;
 
            try {
                const result = await editCharacterService({ params, userId });
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            }
 
            findOneAndUpdateStub.restore();
        });
    });

    describe("removeCharactertests", () => {
        it("should call deleteOne on the Character model", async () => {
            const deleteOneStub = sinon.stub(Character, "deleteOne");
            deleteOneStub.resolves(testCharacter);
            const params = { id: testCharacter._id };
            const userId = testCharacter.created_by;

            const result = await removeCharacterService({ params, userId });

            expect(deleteOneStub.calledOnce).to.be.true; 
            deleteOneStub.restore();
        });

        it("should throw an error when deleteOne fails", async () => {
            const deleteOneStub = sinon.stub(Character, "deleteOne");
            deleteOneStub.throws(error);
            const params = { id: testCharacter._id };
            const userId = testCharacter.created_by;

            try {
                const result = await removeCharacterService({ params, userId });
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            } 
 
            deleteOneStub.restore();
        });
    });
});
