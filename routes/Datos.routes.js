import { Router } from "express";
import { registro,obtencion } from "../controllers/controllers.js";

const router = Router();

// Ruta para guardar un paciente
router.post("/saveData", registro);
router.get("/obtener",obtencion)
export default router;
