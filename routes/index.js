import routerx from "express-promise-router";
import DatosR from "./Datos.routes";

const router = routerx();

router.use("/datos",DatosR);

export default router;
