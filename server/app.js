import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import entriesRoutes from './routes/entries';
import swaggerJson from '../swagger.json';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v2/auth', authRoutes);
app.use('/api/v2/entries', entriesRoutes);
app.use('/api/v2/', swaggerUi.serve, swaggerUi.setup(swaggerJson));

export default app;
