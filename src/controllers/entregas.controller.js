// TODO: cadastrar erros pelo middleware e try/catch
import { UsuariosService } from "../services/entregas.service.js";

const service = new UsuariosService();

export const cadastrarEntrega = async (req, res, next) => {
try {
        const { descricao, origem, destino } = req.body;

        if (!origem || !destino){
                return res.status(400).json({ erro: "Precisa da origem e destino"});
        } 

        service.cadastrarEntrega( descricao, origem, destino);

        res.status(201)
        } catch (err){
                next(err);
        }
}

export const listarEntregas = async (req, res, next) => {
try{
        const lista = service.listarEntregas();

        res.json(lista)
        res.status(200)
        } catch (err) {
                next(err);
        }
}

export const listarEntregasTransito = async (req, res, next)=>{
        try {

        const lista = service.listarEntregasTransito();

        res.json(lista);
        res.status(200)

        } catch (err) {
                next(err);
        }
}

export const listarEntregaPorId = async (req, res, next)=>{

try{
        const { id } = req.params;

        const entrega = service.listarEntregaPorId(id);

        if (!entrega) { return status(404).json({erro: 'Entrega não encontrada'})}

        res.json(entrega)
        res.status(200)

        } catch (err) {
                next(err);
}

export const avancarEntrega = async (req, res, next)=>{

try{
        const dados = req.body
        const { id } = req.params;

        const ok = service.avancarEntrega(id);

        if (!ok) {return res.status(404)}
        if (ok == 0) {return res.status(422)}
        res.status(200)

        } catch (err) {
                next(err);
}

export const cancelarEntrega= async (req, res, next)=>{

try{
        const { id } = req.params;

        const ok = service.cancelarEntrega(id);

        if (!ok) { return res.status(404)}
        if (ok == 0) {return res.status(422)}
        res.status(200)

        } catch (err) {
                next(err);
}

export const historicoEntrega = async (req, res, next)=>{
try {
        const { id } = req.params;
        
        const historico = service.historicoEntrega(id);

        if (!historico) {return res.status(404)}
        res.json(historico)
        res.status(200)

        } catch (err) {
                next(err);
        }
}

