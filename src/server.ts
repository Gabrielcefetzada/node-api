import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import './database';
import { router } from './routes';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ status: 'error', error: 'internal server error' });
});

app.listen(process.env.PORT, () => console.log('Server is running'));
