import routerx from "express-promise-router";
import DatosR from "./Datos.routes";
import usuario from "./Usuarios.routes"

const router = routerx();

router.use("/datos",DatosR);
router.use("/alumno",registrar);
export default router;
