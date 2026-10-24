import { Router } from "express";

import { criarEntregasRouter } from "./entregas.routes.js"
import { EntregasRepositoryPrisma} from '../repositories/entregas.repository.prisma.js'
import { EntregasService} from '../services/entregas.service.js'
import { EntregasController } from '../controllers/entregas.controller.js'

import { criarMotoristaRouter } from "./motorista.routes.js"
import { MotoristaRepositoryPrisma} from '../repositories/motorista.repository.prisma.js'
import { MotoristaService} from '../services/motorista.service.js'
import { MotoristaController } from '../controllers/motorista.controller.js'


const repositoryEntrega = new EntregasRepositoryPrisma();
const repositoryMotorista = new MotoristaRepositoryPrisma();
const serviceMotorista = new MotoristaService(repositoryEntrega, repositoryMotorista,);
const serviceEntrega = new EntregasService(repositoryEntrega, repositoryMotorista);
const controllerMotorista = new MotoristaController(serviceMotorista);
const controllerEntrega = new EntregasController(serviceEntrega);



export const router= Router();

router.use("/entregas", criarEntregasRouter(controllerEntrega));
router.use("/motoristas",criarMotoristaRouter(controllerMotorista));

