import { AppError } from "../utils/appError.utils.js";
//
// export const StatusEntrega = Object.freeze({
//   CRIADA: 'CRIADA',
//   EM_TRANSITO: 'EM_TRANSITO',
//   ENTREGUE: 'ENTREGUE',
//   CANCELADA: 'CANCELADA'
// });

export class EntregasService{
        constructor(repository){
                this.repository = repository;
        }

        async cadastrarEntrega( descricao, origem, destino){
                if (origem === destino) {
                        throw new AppError('Precisa da origem e destino', 400);
                }
                const entrega = await this.repository.listarEntregas();
                const repetido = entrega.some((e) => e.descricao === descricao && 
                                                      e.origem === origem &&
                                                      e.destino === destino);
                if (repetido) { throw new AppError('Duplicata com cadastro existente', 409); }
      
                return this.repository.cadastrarEntrega(descricao, origem, destino);
        }

        async listarEntregas(){
                return this.repository.listarEntregas();
        }

        async listarEntregasFiltrada(filtro){
                const entregasFiltrada = await this.repository.listarEntregasFiltrada(filtro);
                return entregasFiltrada;
        }

        async listarEntregaPorId(id){

                const buscar = await this.repository.listarEntregaPorId(id);
                if (!buscar) { throw new AppError('Nao encontrado', 404); }
                return buscar;

        }
        async avancarEntrega(id){
               const buscar = await this.listarEntregaPorId(id); 
                if (buscar.status === 'ENTREGUE' || buscar.status === 'CANCELADA'){ 
                        throw new AppError('já ENTREGUE/CANCELADA', 422);
                }
                return await this.repository.avancarEntrega(id);
        }

        async cancelarEntrega(id){
                const buscar = await this.listarEntregaPorId(id);
                if (buscar.status === "ENTREGUE" || buscar.status === "CANCELADA"){
                        throw new AppError('não permitido', 422);
                }
                return this.repository.cancelarEntrega(id);
        }
        
        async historicoEntrega(id){
                const buscar = await this.listarEntregaPorId(id);
                return this.repository.buscarEntregaHistorico(id);
        }
}
