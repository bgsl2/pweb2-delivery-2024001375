const StatusEntrega = Object.freeze({
  CRIADA: 'CRIADA',
  EM_TRANSITO: 'EM_TRANSITO',
  ENTREGUE: 'ENTREGUE',
  CANCELADA: 'CANCELADA'
});

let entregas = [ 
        {id: 1, descricao: "teste", origem: "teste", destino: "teste", status: StatusEntrega.criada, motoristaID: 1, historico: {data: '10/11/2026', descricao: "teste"}},
        {id: 2, descricao: "teste", origem: "teste", destino: "teste", status: StatusEntrega.cancelada, motoristaID: 2, historico: {data: '10/11/2026', descricao: "teste"}},
,];
let proximoId = 3;

export class UsuariosService{
        async cadastrarEntrega( descricao, origem, destino){
                if (origem == destino) {
                         

                }
        }
        async listarTodos(){
                return entregas;
        }
}
        const lista = service.listarEntregasTransito();
        const entrega = service.listarEntregaPorId(id);
        const ok = service.avancarEntrega(id);
        const ok = service.cancelarEntrega(id);
        const historico = service.historicoEntrega(id);
