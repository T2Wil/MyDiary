import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import entriesRoutes from './routes/entries';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/entries', entriesRoutes);

export default app;
