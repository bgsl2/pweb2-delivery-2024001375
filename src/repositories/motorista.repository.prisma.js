import { prisma } from '../config/database.js';

export class MotoristaRepositoryPrisma {
    async criar(nome, cpf, placa) {
        const novoMotorista = await prisma.motorista.create({
            data: {
                nome: nome,
                cpf: String(cpf),
                placaveiculo: placa,
                status: 'ATIVO'
            }
        });
        return novoMotorista;
    }

    async listarTodos(filtro) {
        if (filtro) {
            return await prisma.motorista.findMany({
                where: { status: filtro }
            });
        }
        return await prisma.motorista.findMany();
    }

    async buscarPorCpf(cpf) {
        // Caso 'cpf' esteja marcado com @unique no schema.prisma, findUnique funciona;
        // caso contrário, findFirst garante que a busca não quebre se faltar @unique.
        return await prisma.motorista.findUnique({
            where: { cpf: String(cpf) }
        });
    }

    async buscarPorId(id) {
        return await prisma.motorista.findUnique({
            where: { id: Number(id) }
        });
    }
}
