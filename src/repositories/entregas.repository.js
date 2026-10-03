import { StatusEntrega } from "../services/entregas.service.js";

export class EntregasRepository {
        constructor() {
        this.entregas = [
        {id: 1, descricao: "teste", origem: "teste", destino: "teste", status: StatusEntrega.CRIADA, motoristaId: 1, historico: {data: '10/11/2026', descricao: "teste"}},
        {id: 2, descricao: "teste", origem: "teste", destino: "teste", status: StatusEntrega.CANCELADA, motoristaId: 2, historico: {data: '10/11/2026', descricao: "teste"}},
        ];
        this.proximoId = 3;
        }

        async listarEntregas() {
                return this.entregas;
        }

        async cadastrarEntrega(descricao, origem, destino){
                const novaEntrega = { 
                        id: this.proximoId++, 
                        descricao: descricao, 
                        origem: origem, 
                        destino: destino,
                        status: StatusEntrega.CRIADA, 
                        historico: {
                                data: new Date().toISOString(),
                                descricao: "Entrega Cadastrada",
                        }
                }
                this.entregas.push(novaEntrega);
                return novaEntrega;
        }

        async listarEntregasTransito(){
                const entregasEmTransito = this.entregas.filter((entrega) => entrega.status === StatusEntrega.EM_TRANSITO);
                return entregasEmTransito;
        }

        async listarEntregaPorId(id){
                const entrega = this.entregas.find((entrega) => entrega.id == id) ?? null;
                return entrega;
        }

        async avancarEntrega(id){
                if (this.entregas[id].status === StatusEntrega.CRIADA){ 
                        this.entregas[id].status = StatusEntrega.EM_TRANSITO;
                }else {
                        this.entregas[id].status = StatusEntrega.ENTREGUE;
                }
                return this.entregas[id].status
        }

        async cancelarEntrega(id){
                return this.entregas.splice(id, 1);
        }

        async buscarEntregaHistorico(id){
                return this.entregas[id].historico;
        }
}
