import { Router } from "express";
import Datosctr from "../controllers/Datos.controllers.js";
import  {login,Correo, registro,getalumnos}  from "../controllers/Auth.Controllers.js";
import alumnos from "../models/Alumos.models.js";


const router = Router();

router.post("/saveData", (req, res, next) => { 
    Datosctr.postDatos(req, res, next).catch(next)
});

router.get("/datos", (req, res, next) => {
    Datosctr.getDatos(req, res, next).catch(next);
});

router.patch("/actualizar/:id", (req, res, next) => {
    Datosctr.putDatos(req, res, next).catch(next);
});

router.delete("/delete/:id", (req, res, next) => {
    Datosctr.delDatos(req, res, next).catch(next);
});

router.post("/login", (req, res, next) => { 
    login(req, res, next).catch(next)
});
router.post("/correo", (req, res, next) => {
    Correo(req, res, next).catch(next); // Llama a la función Correo del controlador
});

router.post("/registrar", (req, res, next) => {
    registro(req, res, next).catch(next); // Llama a la función Correo del controlador
});

router.get("/alumnos", (req, res, next) => {
    getalumnos(req, res, next).catch(next);
});

export default router;
