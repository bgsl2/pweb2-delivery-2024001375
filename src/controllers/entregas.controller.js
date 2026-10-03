// TODO: cadastrar erros pelo middleware e try/catch

export class EntregaController{
        constructor(service){
                this.service = service;

                this.cadastrarEntrega = this.cadastrarEntrega.bind(this);
                this.listarEntregas = this.listarEntregas.bind(this);
                this.listarEntregaPorId = this.listarEntregaPorId.bind(this);
                this.avancarEntrega = this.avancarEntrega.bind(this);
                this.cancelarEntrega = this.cancelarEntrega.bind(this);
        }


 async cadastrarEntrega (req, res, next) {
        try {
        const { descricao, origem, destino } = req.body;

        novaEntrega= await this.service.cadastrarEntrega( descricao, origem, destino);

        res.status(201).json(novaEntrega)
        } catch (err){
                next(err);
        }
}

async listarEntregas (req, res, next) {
try{
        const { status } = req.query;
        if (status) { 
                        const lista = await this.serice.listarEntregasTransito();
                } else{
                        const lista = await this.service.listarEntregas();
                }

        res.json(lista);
        res.status(200);
        } catch (err) {
                next(err);
        }
}
//
// export const listarEntregasTransito = async (req, res, next)=>{
//         try {
//
//         const lista = service.listarEntregasTransito();
//
//         res.json(lista);
//         res.status(200);
//
//         } catch (err) {
//                 next(err);
//         }
// }

async listarEntregaPorId (req, res, next){

        try{
        const { id } = req.params;

        const entrega = await this.service.listarEntregaPorId(id);

        res.json(entrega);
        res.status(200);

        } catch (err) {
                next(err);
        }
}

async avancarEntrega  (req, res, next){

        try{
        const dados = req.body;
        const { id } = req.params;

        const ok = await this.service.avancarEntrega(id);

        res.status(200);

        } catch (err) {
                next(err);
        }
}

async cancelarEntrega (req, res, next){

try{
        const { id } = req.params;

        const ok = await this.service.cancelarEntrega(id);

        res.status(200);

        } catch (err) {
                next(err);
        }
}

async  historicoEntrega (req, res, next){
try {
        const { id } = req.params;
        
        const historico = await this.service.historicoEntrega(id);

        res.json(historico);
        res.status(200);

        } catch (err) {
                next(err);
        }
}
}
