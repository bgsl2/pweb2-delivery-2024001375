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
        async buscarPorId(motoristaId){
                try{
                        const buscarporId = await this.motoristaRepository.buscarPorId(motoristaId);
                        return buscarPorId;
                } catch(err) {
                        next(err);
                }
        }
        async buscarPorEntrega(motoristaId, entrega){
                try {
                        const motorista = await this.entregaRepository.buscarEntregaMotorista(motoristaId);
                        return motorista;
                } catch (err) {
                       next(err); 
                }
        }
        async buscarEntregaMotoristaFiltrado(motoristaId, entregaRepository){
                try {
                        const motorista = this.entregaRepository.buscarEntregaMotoristaFiltrado(motoristaId, entregaRepository);
                        
                } catch (err) {
                       next(err); 
                }
        }


}
