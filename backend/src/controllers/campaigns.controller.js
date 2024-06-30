import { addCampaignService, editCampaignService, getCampaignsService, getSpecificCampaignService, removeCampaignService } from "../services/campaign.service.js";


export const getCampaignsController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 
    
    try {
        if (!req) throw invalidError;
        const campaigns = await getCampaignsService(req); 
        res.status(200).send(campaigns);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const getSpecificCampaignController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 
    
    try {
        if (!req) throw invalidError;
        const campaign = await getSpecificCampaignService(req); 
        res.status(200).send(campaign);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const addCampaignController = async (req, res) => { 
    const invalidError = new Error("Invalid request");

    try {
        if (!req) throw invalidError;
        const campaign = await addCampaignService(req.body);
        res.status(201).send({ message: `Success`, campaign });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const editCampaignController = async (req, res) => { 
    const invalidError = new Error("Invalid request");

    try {
        if (!req) throw invalidError;
        const campaign = await editCampaignService(req);
        res.status(201).send({ message: `Success`, campaign });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}; 

export const removeCampaignController = async (req, res) => {
    const invalidError = new Error("Invalid request"); 

    try {
        if (!req) throw invalidError;
        const campaign = await removeCampaignService(req);
        res.status(201).send({ message: `Success`, campaign });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};