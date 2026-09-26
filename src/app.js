import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import morgan from 'morgan';

import { router } from './routes/index.js';
import  errorHandler  from './utils/errorHandler.utils.js';

const app = express();

// Middlewares globais
// app.use(helmet());
// app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());

// Rotas
app.use('/api', router);

// Middleware de erros (sempre por último)
app.use(errorHandler);

export default app;
