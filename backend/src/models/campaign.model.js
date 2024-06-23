import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    description: { type: String, required: true },
    dungeon_master: { type: String, required: true },
    players: { type: String, required: true }
});

const Campaign = mongoose.model(`Campaign`, campaignSchema);

export default Campaign;