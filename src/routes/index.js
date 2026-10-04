import { Router } from "express";

import { criarEntregasRouter } from "./entregas.routes.js"
import { EntregasRepository} from '../repositories/entregas.repository.js'
import { EntregasService} from '../services/entregas.service.js'
import { EntregasController } from '../controllers/entregas.controller.js'

import { criarMotoristaRouter } from "./motorista.routes.js"
import { MotoristaRepository} from '../repositories/motorista.repository.js'
import { MotoristaService} from '../services/motorista.service.js'
import { MotoristaController } from '../controllers/motorista.controller.js'


const repositoryEntrega = new EntregasRepository();
const repositoryMotorista = new MotoristaRepository();
const serviceMotorista = new MotoristaService(repositoryEntrega, repositoryMotorista,);
const serviceEntrega = new EntregasService(repositoryEntrega, repositoryMotorista);
const controllerMotorista = new MotoristaController(serviceMotorista);
const controllerEntrega = new EntregasController(serviceEntrega);



export const router= Router();

router.use("/entregas", criarEntregasRouter(controllerEntrega));
router.use("/motoristas",criarMotoristaRouter(controllerMotorista));

