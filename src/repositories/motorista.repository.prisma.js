import { prisma } from '../config/database.js';

export class MotoristaRepositoryPrisma{
// ── CREATE ──────────────────────────────────────────────
        async criar(nome, cpf, placa){
                const novoMotorista = await prisma.Motorista.create({
                        data: {
                                nome:  nome,
                                cpf: cpf,
                                placaveiculo: placa,
                        },
                });
                return novoMotorista;
        }

        async listarTodos(filtro){
                if (filtro){
                        const listaFiltrada = await prisma.Motorista.findMany({
                                where:   { Status: filtro  },
                        });
                        return listaFiltrada
                }
                return await prisma.Motorista.findMany();
        }

        async buscarPorCpf(cpf){
                const motorista = await prisma.Motoristas.findUnique({
                        where: { cpf:cpf }
                });
                return motorista
        }

        async buscarPorId(id){
                const motorista = await prisma.Motoristas.findUnique({
                        where: { id:id }
                });   
                return motorista
        }
}

