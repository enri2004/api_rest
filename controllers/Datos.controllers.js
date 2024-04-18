import Datos from "../models/Datos.models.js";
import bcrypt from "bcrypt"
export default {
  // Endpoint para enviar datos
  postDatos: async (req, res, next) => {
    try {
      const {
        apellido_paterno,
        apellido_materno,
        institucion,
        materia,
        semestre,
        sexo,
        email,
        telefono,
        fecha_nacimiento,
        nombre,
        edad,
        lugar,
        usuario,
        contraseña,
        roles,
        active,
      
      } = req.body;

      const guardarDatos = new Datos({
        usuario,
        contraseña,
        apellido_paterno,
        apellido_materno,
        nombre,
        institucion,
        materia,
        semestre,
        sexo,
        email,
        telefono,
        fecha_nacimiento,
        edad,
        lugar,
        roles,
        active:"true"
      });

      const salt=bcrypt.genSaltSync(10);
      const hashcontraseña=bcrypt.hashSync(contraseña,salt);
      
      guardarDatos.contraseña=hashcontraseña;
      
      const guardar = await guardarDatos.save();
      res.status(200).json(guardar);
    } catch (error) {
      res.status(500).send({
        message: "Error al enviar",
        error: error.message
      });
      next(error);
    }
  },

  // Endpoint para buscar todos los datos
  getDatos: async (req, res, next) => {
    try {
      const datos = await Datos.find();
        // Enviar respuesta con los datos
        res.json(datos);
        console.log("mi nueva")
    } catch (error) {
        console.error('Error al recuperar datos:', error);
        res.status(500).json({ error: 'Error al recuperar datos' });
    }
  },

  // Endpoint para actualizar datos
  putDatos: async (req, res, next) => {
    try {
      const actualizar = await Datos.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      res.status(200).json(actualizar);
    } catch (error) {
      res.status(500).send({
        message: "Error al actualizar",
        error: error.message
      });
      next(error);
    }
  },

  // Endpoint para eliminar datos
  delDatos: async (req, res, next) => {
    try {
      await Datos.findByIdAndDelete(req.params.id);
      res.status(200).send({
        message: "Datos eliminados correctamente"
      });
    } catch (error) {
      res.status(500).send({
        message: "Error al eliminar dato",
        error: error.message
      });
      next(error);
    }
  }
      

  
 
  
}
