import { prisma } from '../config/database.js';

export class EntregasRepositoryPrisma {
        async listarEntregas() {
                return await prisma.Entregas.findMany();
        }

        async cadastrarEntrega(descricao, origem, destino) {
                const novaEntrega = await prisma.Entregas.create({
                        data: {
                                descricao: descricao,
                                origem: origem,
                                destino: destino,
                                status: 'CRIADA',
                                motoristaId: null,
                                historico: {
                                        create: {
                                                descricao: "Entrega Cadastrada",
                                        }
                                }
                        },
                        include: { historico: true }
                })
                return novaEntrega;
        }
        async listarEntregasFiltrada(filtro) {
                const entregasFiltrada = await prisma.Entregas.findMany({
                        where: { status: filtro }
                })
                return entregasFiltrada;
        }

        async listarEntregaPorId(id) {
                const entregasFiltrada = await prisma.Entregas.findUnique({
                        where: { id: Number(id) }
                })
                return entregasFiltrada;
        }

        async avancarEntrega(id) {
                const entrega = await prisma.Entregas.findUnique({
                        where: { id: Number(id) },
                        include: { historico: true }
                });

                if (!entrega) { return null; }

                let novoStatus = null;
                if (entrega.status === 'CRIADA') {
                        novoStatus = 'EM_TRANSITO';
                }
                if (entrega.status === 'EM_TRANSITO') {
                        novoStatus = 'ENTREGUE';
                }

                const entregasAtualizada = await prisma.Entregas.update({
                        where: { id: Number(id) },
                        data: {
                                status: novoStatus,
                                historico: {
                                        create: {
                                                descricao: novoStatus
                                        }
                                }
                        },
                        include: {
                                historico: true
                        }
                });
                return entregasAtualizada;
        }

        async cancelarEntrega(id) {
                return await prisma.entregas.update({
                        where: { id: Number(id) },
                        data: {
                                status: 'CANCELADA',
                                historico: {
                                        create: {
                                                descricao: 'CANCELADA'
                                        }
                                }
                        },
                        include: { historico: true }
                });
                // await prisma.Entregas.delete({
                //         where: { id: Number(id) },
                // })
                // return true
        }

        async buscarEntregaHistorico(id) {
                const entrega = await prisma.Entregas.findUnique({
                        where: { id: Number(id) },
                        include: { historico: true }
                });
                return entrega.historico;
        }

        async buscarEntregaMotorista(motoristaId) {
                return await prisma.Entregas.findFirst({
                        where: { motoristaId: Number(motoristaId) },
                });
        }
        async buscarEntregaMotoristaFiltrado(motoristaId, status) {
                return await prisma.Entregas.findFirst({
                        where: {
                                motoristaId: Number(motoristaId),
                                status: status
                        },
                        include: {
                                historico: true
                        }

                });
        }
        async atribuirEntrega(id, motoristaId) {
                return await prisma.entregas.update({
                        where: {
                                id: Number(id)
                        },
                        data: {
                                motoristaId: Number(motoristaId),
                                historico: {
                                        create: {
                                                descricao: `Motorista ${motoristaId} atribuído à entrega`
                                        }
                                }
                        },
                        include: {
                                historico: true,
                                // motorista: true 
                        }
                });
        }
}
