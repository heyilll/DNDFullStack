import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectDb } from './src/db/db.connection.js'; 
import { CampaignRouter } from './src/routes/campaigns.routes.js';
import { CharacterRouter } from './src/routes/characters.routes.js'; 
import { UserRouter } from './src/routes/users.routes.js'; 
import { DndRouter } from './src/routes/dnd.routes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

app.use(cors());
app.use(express.json());

connectDb();
 
app.use(`/`, UserRouter);
app.use(`/campaigns`, CampaignRouter);
app.use(`/characters`, CharacterRouter); 
app.use(`/`, DndRouter);


const { PORT, HOST } = process.env;

const server = app.listen(PORT, HOST, () => { 
    console.log(`Server is listening at http://${HOST}:${PORT}`);
});

export default server;