import { AppError } from "../utils/appError.utils.js";

export class MotoristaService{
        constructor(entregaRepository, motoristaRepository){
                this.entregaRepository = entregaRepository;
                this.motoristaRepository = motoristaRepository;
        }
        async cadastrarMotorista(nome, cpf, placa){
                try {
                        const buscarPorCpf = await this.motoristaRepository.buscarPorCpf(cpf)
                        if (buscarPorCpf) { throw new appError('cpf duplicado', 409); }
                        
                        return this.motoristaRepository.criar(nome, cpf, placa);
                } catch (err) {
                       next(err); 
                }
        }

        

}
