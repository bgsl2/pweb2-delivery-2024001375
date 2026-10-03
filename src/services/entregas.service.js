import { AppError } from "../utils/appError.utils.js";

const StatusEntrega = Object.freeze({
  CRIADA: 'CRIADA',
  EM_TRANSITO: 'EM_TRANSITO',
  ENTREGUE: 'ENTREGUE',
  CANCELADA: 'CANCELADA'
});

let entregas = [ 
        {id: 1, descricao: "teste", origem: "teste", destino: "teste", status: StatusEntrega.CRIADA, motoristaID: 1, historico: {data: '10/11/2026', descricao: "teste"}},
        {id: 2, descricao: "teste", origem: "teste", destino: "teste", status: StatusEntrega.CANCELADA, motoristaID: 2, historico: {data: '10/11/2026', descricao: "teste"}},
,];
let proximoId = 3;

export class UsuariosService{
        async cadastrarEntrega( descricao, origem, destino){
                if (origem === destino) {
                        throw new AppError('Precisa da origem e destino', 400);
                }
                const repetido = entregas.some((e) => e.descricao === descricao && 
                                                      e.origem === origem &&
                                                      e.destino === destino);
                if (repetido) { throw new AppError('Duplicata com cadastro existente', 409); }

                const novaEntrega = { 
                        id: proximoId++, 
                        descricao: descricao, 
                        origem: origem, 
                        status: StatusEntrega.CRIADA, 
                        historico: {
                                data: new Date().toISOString(),
                                descricao: "Entrega Cadastrada",
                        }
                }
                entregas.push(novaEntrega);
                return novaEntrega;
        }

        async listarTodos(){
                return entregas;
        }

        async listarEntregasTransito(){
                const entregasEmTransito = entregas.filter((entrega) => entrega.status === StatusEntrega.EM_TRANSITO);
                return entregasEmTransito;
        }

        async listarEntregaPorId(id){
                const buscar = entregas.find((entrega) => entrega.id == id);
                if (!buscar) { throw new AppError('Nao encontrado', 404); }
                return buscar;

        }
        async avancarEntrega(id){
                buscar = this.listarEntregaPorId(id); 
                if (buscar.status === StatusEntrega.ENTREGUE || buscar.status === StatusEntrega.CANCELADA){ 
                        throw new AppError('já ENTREGUE/CANCELADA', 422)
                }
                if (buscar.status === StatusEntrega.CRIADA){ 
                        entregas[id].status = StatusEntrega.EM_TRANSITO;
                }
                if (buscar.status === StatusEntrega.EM_TRANSITO){
                        entregas[id].status = StatusEntrega.ENTREGUE;
                }
                return entrega[id].buscar;
        }

        async cancelarEntrega(id){
                buscar = this.listarEntregaPorId(id);
                if (buscar.status === StatusEntrega.ENTREGUE || buscar.status === StatusEntrega.CANCELADA){
                        throw new AppError('não permitido', 422);
                }
                entregas.splice(id, 1);
        }
        
        async historicoEntrega(id){
                buscar = this.listarEntregaPorId(id);
                return buscar.historico;
        }
}
