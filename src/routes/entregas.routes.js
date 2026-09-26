import { Router } from "express";
import * as entregasController from '../controllers/entregas.controller.js'

export const entregasRouter = Router();

entregasRouter.post('/', entregasController.cadastrarEntrega);
entregasRouter.get('/', entregasController.listarEntregas);
entregasRouter.get('/:id', entregasController.listarEntregaPorId);
entregasRouter.get('/:id/avancar', entregasController.atualizarEntrega);
entregasRouter.patch('/:id/cancelar',entregasController.cancelarEntrega);
entregasRouter.patch('/:id/historico',entregasController.historicoEntrega);

export default entregasRouter;
