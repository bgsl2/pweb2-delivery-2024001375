import { Router } from "express";
import { EntregasRouter } from "./entregas.routes.js"

export const router= Router();

router.use("/entregas", entregasRouter);

