import { Router } from "express";
import Datosctr from "../controllers/Datos.controllers.js";
import  {login,Correo, registro,editar,eliminar,refreshAccessToken}  from "../controllers/Auth.Controllers.js";
import {obtenerUserLogued, Id_maestro}from "../controllers/use.controllers.js"
import asureAuth  from "../middlewares/Autentication.js";
import  multiparty from "connect-multiparty"; 


const md_upload = multiparty({ uploadDir: "./uploads" });




const router = Router();

router.post("/saveData",[md_upload], (req, res, next) => { 
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

router.post("/registrar/alumnos", (req, res, next) => {
    registro(req, res, next).catch(next); // Llama a la función Correo del controlador
});
router.post("/auth/refreshtoken", (req, res, next) => {
    refreshAccessToken(req, res, next).catch(next); // Llama a la función Correo del controlador
});

router.delete("/alumnos/eliminar/:_id", (req, res, next) => {
    eliminar(req, res, next).catch(next);
});

router.patch("/alumnos/editar/:_id", (req, res, next) => {
    editar(req, res, next).catch(next);
});
router.get("/obtener", [asureAuth], (req, res, next) => {
    obtenerUserLogued(req, res, next).catch(next);
});

router.get("/Id_maestro",[asureAuth],(req,res,next)=>{
   Id_maestro(req,res,next);
}
)



export default router;
