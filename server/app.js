import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import authRoutes from './routes/auth';
import entriesRoutes from './routes/entries';
import swaggerJson from '../swagger.json';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/entries', entriesRoutes);

export default app;
