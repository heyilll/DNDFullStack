import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    description: { type: String, required: true },
    dungeon_master: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'UserID', required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserID' }],
    notes: { type: String },
});

const Campaign = mongoose.model(`Campaign`, campaignSchema);

export default Campaign;