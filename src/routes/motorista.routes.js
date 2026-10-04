import { Router } from "express";
// import { EntregasRepository} from '../repositories/entregas.repository.js'
// import { EntregasService} from '../services/entregas.service.js'
// import { EntregasController } from '../controllers/entregas.controller.js'
//
// const repository = new EntregasRepository();
// const service = new EntregasService(repository);
// const controller = new EntregasController(service);
export function criarMotoristaRouter(controller){
const motoristaRouter = Router();

motoristaRouter.post('/', controller.cadastrarMotorista);
motoristaRouter.get('/', controller.listarMotoristas);
motoristaRouter.get('/:id',controller.buscarPorId);
motoristaRouter.get('/:id/entregas', controller.buscarPorEntrega);

return motoristaRouter;
}
