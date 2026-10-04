// import { StatusEntrega } from "../services/entregas.service.js";

export class EntregasRepository {
        constructor() {
        this.entregas = [
        {id: 1, descricao: "teste", origem: "teste", destino: "teste", status:'CRIADA', motoristaId: null, historico: [{data: new Date().toISOString(), descricao: "teste"}]},
        {id: 2, descricao: "teste", origem: "teste", destino: "teste", status:'CRIADA', motoristaId: null, historico: [{data: new Date().toISOString(), descricao: "teste"}]},
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
                        status: 'CRIADA', 
                        motoristaId: null,
                        historico: [{
                                data: new Date().toISOString(),
                                descricao: "Entrega Cadastrada",
                        }]
                }
                this.entregas.push(novaEntrega);
                return novaEntrega;
        }

        async listarEntregasFiltrada(filtro){
                const entregasFiltrada = this.entregas.filter((entrega) => entrega.status === filtro);
                return entregasFiltrada;
        }

        async listarEntregaPorId(id){
                const entrega = this.entregas.find((entrega) => entrega.id === Number(id)) ?? null;
                return entrega;
        }

        async avancarEntrega(id){
                const entrega = this.entregas.find(e => e.id === Number(id));
                if (entrega.status === 'CRIADA'){ 
                        entrega.status = 'EM_TRANSITO';
                        entrega.historico.push(
                                {
                                data: new Date().toISOString(),
                                descricao: "EM_TRANSITO",
                                }
                        )
                        return entrega;
                } 
                if (entrega.status === 'EM_TRANSITO'){
                        entrega.status = 'ENTREGUE';
                                entrega.historico.push(
                                {
                                data: new Date().toISOString(),
                                descricao: "ENTREGUE",
                                }
                        )
                        return entrega;
                }
                return entrega;
        }

        async cancelarEntrega(id){
                return this.entregas.splice(id, 1);
        }

        async buscarEntregaHistorico(id){
                const busca = this.entregas.find((entrega) => entrega.id === Number(id))
                return busca.historico;
        }
}
