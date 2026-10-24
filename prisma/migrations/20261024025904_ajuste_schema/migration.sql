-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entregas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CRIADA',
    "motorista_id" INTEGER,
    CONSTRAINT "Entregas_motorista_id_fkey" FOREIGN KEY ("motorista_id") REFERENCES "Motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Entregas" ("descricao", "destino", "id", "motorista_id", "origem", "status") SELECT "descricao", "destino", "id", "motorista_id", "origem", "status" FROM "Entregas";
DROP TABLE "Entregas";
ALTER TABLE "new_Entregas" RENAME TO "Entregas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
