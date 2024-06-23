import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    race: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, required: true, min: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
});

const Character = mongoose.model(`Character`, characterSchema);

export default Character;