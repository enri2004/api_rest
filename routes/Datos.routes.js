import { Router } from "express";
import Datosctr from "../controllers/Datos.controllers";

const router = Router();

router.post("/saveData", (req, res, next) => {
    Datosctr.postDatos(req, res, next).catch(next);
});

router.get("/buscar", (req, res, next) => {
    Datosctr.getDatos(req, res, next).catch(next);
});

router.patch("/actualizar/:id", (req, res, next) => {
    Datosctr.putDatos(req, res, next).catch(next);
});

router.delete("/delete/:id", (req, res, next) => {
    Datosctr.delDatos(req, res, next).catch(next);
});

router.get("/validar", (req, res, next) => {
    Datosctr.getDato(req, res, next).catch(next);
});

export default router;