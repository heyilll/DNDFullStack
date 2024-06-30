import { expect } from "chai";
import sinon from "sinon";
import Campaign from "../src/models/campaign.model.js";
import { addCampaignService, removeCampaignService, getCampaignsService, getSpecificCampaignService, editCampaignService } from "../src/services/campaign.service.js";

describe('Testing requests on database', () => {
    let testCampaign, error ; 
    beforeEach(() => {
        testCampaign = {  
            _id: "66807dc1840d5cb1c4cdc296",
            id: "668017fc7f2de206cfead3ec",
            name: "1",
            race: "elf",
            class: "bard",
            level: 15,
            created_by: "668017fc7f2de206cfead3ec" ,
            created_at: "2024-06-29T21:33:53.335Z",
            },
        error = new Error();     
    });

    describe("getCampaignstests", () => {
        it("should call find on the Campaign model", async () => {
            const findStub = sinon.stub(Campaign, "find");
            findStub.resolves(testCampaign);
            const userId = testCampaign.created_by;

            const result = await getCampaignsService({ userId });

            expect(findStub.calledOnce).to.be.true;
            expect(result).to.equal(testCampaign);
            findStub.restore();
        });

        it("should throw an error when find fails", async () => {
            const findStub = sinon.stub(Campaign, "find");
            findStub.throws(error);
            const userId = testCampaign.created_by;

            

            try {
                const result = await getCampaignsService({ userId });
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            } 
 
            findStub.restore();
        });
    });

    describe("getSpecificCampaigntests", () => {
        it("should call findOne on the Campaign model", async () => {
            const findOneStub = sinon.stub(Campaign, "findOne");
            findOneStub.resolves(testCampaign);
            const params = { id: testCampaign._id };
            const userId = testCampaign.created_by;

            const result = await getSpecificCampaignService({ params, userId });

            expect(findOneStub.calledOnce).to.be.true;
            expect(result).to.equal(testCampaign);
            findOneStub.restore();
        });

        it("should throw an error when findOne fails", async () => {
            const findOneStub = sinon.stub(Campaign, "findOne");
            findOneStub.throws(error);
            const params = { id: testCampaign._id };
            const userId = testCampaign.created_by;
 
            try {
                const result = await getSpecificCampaignService({ params, userId });
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            }
 
            findOneStub.restore();
        });
    });

    describe("addCampaigntests", () => {
        it("should call save on the Campaign model", async () => {
            const saveStub = sinon.stub(Campaign.prototype, "save");
            saveStub.resolves(testCampaign);

            const result = await addCampaignService(testCampaign);

            expect(saveStub.calledOnce).to.be.true;
            expect(result).to.equal(testCampaign);
            saveStub.restore();
        });

        it("should throw an error when save fails", async () => {
            const saveStub = sinon.stub(Campaign.prototype, "save");
            saveStub.throws(error);

            try {
                const result = await addCampaignService(testCampaign);
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            } 
 
            saveStub.restore();
        });
    });

    describe("editCampaigntests", () => {
        it("should call findOneAndUpdate on the Campaign model", async () => {
            const findOneAndUpdateStub = sinon.stub(Campaign, "findOneAndUpdate");
            findOneAndUpdateStub.resolves(testCampaign);
            const params = { id: testCampaign._id };
            const userId = testCampaign.created_by;
            const updateData = { name: 'Updated Campaign', description: 'New description' }; 

            const result = await editCampaignService({ params, userId, updateData });

            expect(findOneAndUpdateStub.calledOnce).to.be.true;
            expect(result).to.equal(testCampaign);
            findOneAndUpdateStub.restore();
        });

        it("should throw an error when findOneAndUpdate fails", async () => {
            const findOneAndUpdateStub = sinon.stub(Campaign, "findOneAndUpdate");
            findOneAndUpdateStub.throws(error);
            const params = { id: testCampaign._id };
            const userId = testCampaign.created_by;
 
            try {
                const result = await editCampaignService({ params, userId });
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            }
 
            findOneAndUpdateStub.restore();
        });
    });

    describe("removeCampaigntests", () => {
        it("should call deleteOne on the Campaign model", async () => {
            const deleteOneStub = sinon.stub(Campaign, "deleteOne");
            deleteOneStub.resolves(testCampaign);
            const params = { id: testCampaign._id };
            const userId = testCampaign.created_by;

            const result = await removeCampaignService({ params, userId });

            expect(deleteOneStub.calledOnce).to.be.true; 
            deleteOneStub.restore();
        });

        it("should throw an error when deleteOne fails", async () => {
            const deleteOneStub = sinon.stub(Campaign, "deleteOne");
            deleteOneStub.throws(error);
            const params = { id: testCampaign._id };
            const userId = testCampaign.created_by;

            try {
                const result = await removeCampaignService({ params, userId });
                assert.fail("It should have thrown an error.")
            } catch (err) {
                expect(err).to.equal(error);
            } 
 
            deleteOneStub.restore();
        });
    });
});
