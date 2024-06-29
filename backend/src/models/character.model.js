import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    race: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, required: true, min: 1 },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

const Character = mongoose.model(`Character`, characterSchema);

export default Character;