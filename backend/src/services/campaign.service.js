import Campaign from "../models/campaign.model.js";
  
export const getCampaignsService = async ({ userId }) => { 
    try { 
        return await Campaign.find({ created_by: userId }); 
    } catch (e) {
        throw e;
    }
};

export const getSpecificCampaignService = async ({ params, userId }) => { 
    try {  
        return await Campaign.findOne({ _id: params.id, created_by: userId });
    } catch (e) {
        throw e;
    }
};

export const addCampaignService = async ({ name, description, dungeon_master, created_by, players }) => {
    try { 
        const newCampaign = new Campaign({ name: name, description: description, dungeon_master: dungeon_master, created_by: created_by, players: players});
        return await newCampaign.save();
    } catch (e) {
        throw e;
    }
};

export const editCampaignService = async ({ params, userId, updateData }) => {
    try { 
        const campaign = Campaign.findOneAndUpdate({ _id: params.id, created_by: userId }, updateData,
            { new: true, runValidators: true });
        if (!campaign) throw new Error(`Campaign not found`);
        return campaign;
    } catch (e) {
        throw e;
    }
};

export const removeCampaignService = async ({ params, userId }) => { 
    try { 
        return await Campaign.deleteOne({ _id: params.id, created_by: userId }); 
    } catch (e) {
        throw e;
    }
};