import Datos from "../models/Datos.models.js";
import image from "../utils/image.js"


async function obtenerUserLogued(req, res) {
    try {
        const { usuario_id } = req.usuario; 
        // Buscar al usuario por su ID en la base de datos
        const usuario = await Datos.findById(usuario_id);

        if (!usuario) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }

        // Devolver los datos del usuario
        res.status(200).send(usuario);
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        res.status(500).send({ msg: "Error al obtener los datos del usuario" });
    }
}


async function Id_maestro(req, res){
    try {
        const { usuario_id } = req.usuario; 
        const usuario = await Datos.findById(usuario_id);

        if (!usuario) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }

        
        const id_maestro = usuario.Id_maestro;
        res.status(200).send({ id_maestro });
    } catch (error) {
        console.error("Error al obtener el Id_maestro del usuario:", error);
        res.status(500).send({ msg: "Error al obtener el Id_maestro del usuario" });
    }
}





export  {obtenerUserLogued,Id_maestro};