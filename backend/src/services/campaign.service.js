import { loginUserService } from "./users.services";
  
export const getCampaignsService = async ({email, password }) => { 
    try { 
        if (loginUserService({email, password}) == null) {
            throw new Error("Unauthorised"); 
        } 
        return await Campaign.find({ email: email }); 
    } catch (e) {
        throw e;
    }
};

export const getSpecificCampaignService = async ({email, password, id }) => { 
    try { 
        if (loginUserService({email, password}) == null) {
            throw new Error("Unauthorised"); 
        } 
        return await Campaign.find({ email: email, id: id }); 
    } catch (e) {
        throw e;
    }
};

export const addCampaignService = async ({ location, email, password }) => {
    try {
        if (loginUserService({ email, password }) == null) {
            throw new Error("Unauthorised");
        }
        const newCampaign = new Campaign({ location: location, email: email});
        return await newCampaign.save();
    } catch (e) {
        throw e;
    }
};

export const editCampaignService = async ({ id, email, password }) => {
    try {
        if (loginUserService({ email, password }) == null) {
            throw new Error("Unauthorised");
        }
        const campaign = new Campaign({ _id: id, email: email});
        return await campaign.save();
    } catch (e) {
        throw e;
    }
};

export const removeCampaignService = async ({ id, email, password }) => {
    
    try {
        if (loginUserService({email, password}) == null) {
            throw new Error("Unauthorised");
        }
        return await Campaign.deleteOne({ _id: id, email: email }); 
    } catch (e) {
        throw e;
    }
};