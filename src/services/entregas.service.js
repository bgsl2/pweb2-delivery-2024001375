
        service.cadastrarEntrega( descricao, origem, destino);
        const lista = service.listarEntregas();
        const lista = service.listarEntregasTransito();
        const entrega = service.listarEntregaPorId(id);
        const ok = service.avancarEntrega(id);
        const ok = service.cancelarEntrega(id);
        const historico = service.historicoEntrega(id);
