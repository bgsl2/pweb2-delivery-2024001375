export class MotoristaRepository{
        constructor(){
                let motoristas = [
                        {id: 1, nome: 'Jose', cpf:'1234567', placaveiculo: '123a34', status: 'ATIVO'},
                        {id: 2, nome: 'Josi', cpf:'1334567', placaveiculo: '122a34', status: 'ATIVO'},
                ];
                let proximoId = 3;
        }

        async listarTodos(filtro){
                if (filtro){
                        let lista = this.motoristas.filter((entrega) => entrega.status === filtro);
                        return lista;
                }
                return this.motoristas;
        }

        async buscarPorId(id){
                return this.motoristas.find(m => m.id === Number(id));
        }
        async buscarPorCpf(cpf){
                return this.motoristas.find(m => m.cpf === Number(cpf));
        }
        async criar(nome, cpf, placa){
                const novoMotorista = {
                        id: proximoId++,
                        nome: nome,
                        cpf: cpf,
                        placaveiculo: placa,
                        status: 'ATIVO',
                };
                this.motoristas.push(novoMotorista);
                return novoMotorista;
        }
}
