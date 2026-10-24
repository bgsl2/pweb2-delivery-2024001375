import { AppError } from "../utils/appError.utils.js";

export class MotoristaService{
        constructor(entregaRepository, motoristaRepository){
                this.entregaRepository = entregaRepository;
                this.motoristaRepository = motoristaRepository;
        }
        async cadastrarMotorista(nome, cpf, placa){
                const buscarPorCpf = await this.motoristaRepository.buscarPorCpf(cpf)
                if (buscarPorCpf) { throw new AppError('cpf duplicado', 409); }
                return this.motoristaRepository.criar(nome, cpf, placa);
        }
        async listarTodos(){
                return await this.motoristaRepository.listarTodos();
        }
        async buscarPorId(motoristaId){
                const buscarporId = await this.motoristaRepository.buscarPorId(motoristaId);
                return buscarporId;
        }
        async buscarPorEntrega(motoristaId){
                const motorista = await this.entregaRepository.buscarEntregaMotorista(motoristaId);
                return motorista;
        }
        async buscarEntregaMotoristaFiltrado(motoristaId, status){
                const motorista = this.entregaRepository.buscarEntregaMotoristaFiltrado(motoristaId, status);
                return motorista;
}
}
