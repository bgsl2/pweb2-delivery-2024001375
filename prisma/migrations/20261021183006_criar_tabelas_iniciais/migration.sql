-- CreateTable
CREATE TABLE "Entregas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CRIADO',
    "motorista_id" INTEGER,
    CONSTRAINT "Entregas_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Historico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT NOT NULL,
    "entrega_id" INTEGER NOT NULL,
    CONSTRAINT "Historico_entrega_id_fkey" FOREIGN KEY ("entrega_id") REFERENCES "Entregas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Motorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "placa_veiculo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO'
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorista_cpf_key" ON "Motorista"("cpf");
