// TODO: cadastrar erros pelo middleware e try/catch

export class EntregasController{
        constructor(service){
                this.service = service;

                this.cadastrarEntrega = this.cadastrarEntrega.bind(this);
                this.listarEntregas = this.listarEntregas.bind(this);
                this.listarEntregaPorId = this.listarEntregaPorId.bind(this);
                this.avancarEntrega = this.avancarEntrega.bind(this);
                this.cancelarEntrega = this.cancelarEntrega.bind(this);
                this.historicoEntrega = this.historicoEntrega.bind(this);
                this.atribuirEntrega = this.atribuirEntrega.bind(this);
        }


 async cadastrarEntrega (req, res, next) {
        try {
        const { descricao, origem, destino } = req.body;

        const novaEntrega = await this.service.cadastrarEntrega( descricao, origem, destino);

        return res.status(201).json(novaEntrega);
        } catch (err){
                next(err);
        }
}

async listarEntregas (req, res, next) {
try{
        const { status } = req.query;
        let lista; 
        if (status) { 
                        lista = await this.service.listarEntregasFiltrada(status);
                } else{
                        lista = await this.service.listarEntregas();
                }

        return res.status(200).json(lista);
        } catch (err) {
                next(err);
        }
}

async listarEntregaPorId (req, res, next){

        try{
        const { id } = req.params;

        const entrega = await this.service.listarEntregaPorId(id);

        return res.status(200).json(entrega);

        } catch (err) {
                next(err);
        }
}

async avancarEntrega  (req, res, next){

        try{
        const { id } = req.params;

        const status = await this.service.avancarEntrega(id);

        return res.status(200).json(status);

        } catch (err) {
                next(err);
        }
}

async cancelarEntrega (req, res, next){

try{
        const { id } = req.params;

        const ok = await this.service.cancelarEntrega(id);

        return res.status(200).json(ok);

        } catch (err) {
                next(err);
        }
}

async  historicoEntrega (req, res, next){
try {
        const { id } = req.params;
        
        const historico = await this.service.historicoEntrega(id);

        return res.status(200).json(historico);

        } catch (err) {
                next(err);
        }
}
async atribuirEntrega( req, res, next){
        try{
        const { motoristaId } = req.body;
        const { id } = req.params;

        const atribuir = await this.service.atribuirEntrega(id, motoristaId);

        return res.status(200).json(atribuir)

        } catch (err){
                next(err);
                }
        }
}
