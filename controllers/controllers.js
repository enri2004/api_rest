import {saveDatos, perfil_login} from "../models/datos.js";

/*async function registro(req, res, next) {
    try {
        const data = req.body;
        const guardar = await paciente.save(data);
        res.status(200).json(guardar);
    } catch (error) {
        res.status(500).json({
            message: "Error al guardar los datos",
            error: error.message
        });
        next(error);
    }
}*/


async function registro(req,res,next) {
   try
   { const tabla = req.query.tabla;
    const data= req.body;

    let datos;

    if(tabla === "Paciente"){
        datos = await saveDatos.savePaciente(data);
        res.status(200).json(guardar);
    }
    else if (tabla==="Personal"){
        datos= await saveDatos.savePersonal(data);
        res.status(200).send(guardar)
    }else if (tabla === "Inventario"){
        datos = await saveDatos.saveInventario(data);
    }
    else{
        return res.status(400).send("no se encuentra esta tabla")
    }
}catch(error){
    throw error;
    
}

}

async function obtencion(req, res, next) {
    try {
        const tabla = req.query.tabla;
        let items;
        if (tabla === "login") {
            const Usuario = req.query.Usuario;
            const Contraseña = req.query.Contraseña;

            items = await perfil_login.findAll(tabla, Usuario, Contraseña, null, null);
                }
        else if (tabla === "perfil") {
            const idperfil = req.query.idperfil;

            items = await perfil_login.findAll(tabla, null, null, idperfil);
        } else {
            return res.status(400).send("Tabla no válida");
        }
        if (items) {
            return res.json(items);
        } else {
            return res.status(401).send("Credenciales incorrectas o datos no encontrados");
        }
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return res.status(500).send("Error al obtener los datos");
    }
}




export { registro,obtencion};
