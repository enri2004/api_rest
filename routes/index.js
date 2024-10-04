import { Router } from "express";
import paciente from "./Datos.routes.js"; // Asegúrate de tener este archivo de rutas de paciente

const router = Router();

// Usar las rutas del módulo "paciente"
router.use("/", paciente);

export default router;

