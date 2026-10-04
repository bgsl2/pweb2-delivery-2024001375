export class MotoristaController{
        constructor(motoristaService){
                this.service = motoristaService;

                this.cadastrarMotorista = this.cadastrarMotorista.bind(this);
                this.listarMotoristas = this.listarMotoristas.bind(this);
                this.buscarPorId = this.buscarPorId.bind(this);
                this.buscarPorEntrega = this.buscarPorEntrega.bind(this);
                
        }

async cadastrarMotorista( req, res, next){
                try{
                const { nome, cpf, placa } = req.body;

                const novoMotorista = await this.service.cadastrarMotorista(nome,cpf,placa);
                
                return res.status(201).json(novoMotorista);
                } catch (err) {
                        next(err);
                }
        }
async listarMotoristas(req , res, next){
                try{
                        const lista = await this.service.listarTodos();

                        return res.status(200).json(lista);
                } catch (err) {
                        next(err);
                }
        }
async buscarPorId(req, res, next){
                try{
                        const { id } = req.params;
                        const busca = await this.service.buscarPorId(id)
                        return res.status(200).json(busca);
                } catch  (err){
                        next(err);
                }
        }
async buscarPorEntrega(req, res, next){
                try {
                        let busca=[];
                        const { id } = req.params;
                        const { status } = req.query;
                        if (status) {
                                busca.push( await this.service.buscarEntregaMotoristaFiltrado(id, status));
                        } else {
                                busca.push(await this.service.buscarPorEntrega(id));
                        }
                        return res.status(200).json(busca);
                } catch (err) {
                        next(err);
                }
        }
}

