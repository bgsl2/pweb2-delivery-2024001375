import { Router } from "express";
import entregasRouter from "./entregas.routes.js"

export const router= Router();

router.use("/entregas", entregasRouter);

