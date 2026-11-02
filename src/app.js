import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import helmet from 'helmet';
// import cors from 'cors';
// import morgan from 'morgan';

import { router } from './routes/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views')); //diretorios dos templates

// Middlewares globais
// app.use(helmet());
// app.use(cors());
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); //parse formulario html
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));


// Rotas
app.use('/api', router);


export default app;
