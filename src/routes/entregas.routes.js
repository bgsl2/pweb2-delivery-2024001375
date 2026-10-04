import { Router } from "express";
import { EntregasRepository} from '../repositories/entregas.repository.js'
import { EntregasService} from '../services/entregas.service.js'
import { EntregasController } from '../controllers/entregas.controller.js'

const repository = new EntregasRepository();
const service = new EntregasService(repository);
const controller = new EntregasController(service);

export const entregasRouter = Router();

entregasRouter.post('/', controller.cadastrarEntrega);
entregasRouter.get('/', controller.listarEntregas);
entregasRouter.get('/:id',controller.listarEntregaPorId);
entregasRouter.patch('/:id/avancar', controller.avancarEntrega);
entregasRouter.patch('/:id/cancelar',controller.cancelarEntrega);
entregasRouter.get('/:id/historico',controller.historicoEntrega);

export default entregasRouter;
