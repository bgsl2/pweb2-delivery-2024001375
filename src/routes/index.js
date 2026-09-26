import { Router } from "express";
import entregasRouter from "./entregas.routes.js"

export const criarRotas= Router();

criarRotas.use("/entregas", entregasRouter);

