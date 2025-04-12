import express, { type Request, type Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import * as pinController from './api/controller';

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(limiter);
app.use(express.json());

app.get('/', (req : Request, res : Response) => {
  res.send('GitHub Repository Pin API - Use /api/pin to generate repository pins');
});


app.get('/api/pin', pinController.generatePin);
app.get('/api' , (_,res)=>res.json({"version" : "0.0.1", "message" : "Service Online 🟢"}));


app.listen(port, () => {
  console.log(`GitHub Pin API running on port ${port}`);
});

export default app;
