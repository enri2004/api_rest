import Datos from '../models/Datos.models.js';
import alumnos from '../models/Alumos.models.js';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import {createAccessToken,createRefreshToken,decoded,} from "../utils/jwt.js";





dotenv.config();
async function login(req, res) {
    const { usuario, contraseña } = req.body;
  
    if (!usuario) return res.status(400).send({ msg: "El Usuario es obligatorio" });
    if (!contraseña) return res.status(400).send({ msg: "El password es obligatorio" });
  
    try {
      const usuarioLowerCase = usuario.toLowerCase();
      const user = await Datos.findOne({ usuario: usuarioLowerCase });
  
      if (!user) {
        return res.status(400).send({ msg: "Usuario o contraseña incorrectos" });
      }
  
      bcrypt.compare(contraseña, user.contraseña, (bcryptError, check) => {
        if (bcryptError) {
          return res.status(500).send({ msg: "Error del servidor" });
        }
  
        if (!check) {
          return res.status(400).send({ msg: "Password incorrecto" });
        }
  
        if (!user.active) {
          return res.status(400).send({ msg: "Usuario inactivo" });
        }
  
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
  
        return res.status(200).send({
          access: accessToken,
          refresh: refreshToken,
          msg: "Usuario logueado correctamente",
          roles: user.roles,
          Id_maestro: user.Id_maestro
        });
      });
    } catch (error) {
      return res.status(500).send({ msg: "Error al autenticar" });
    }
  }
  

async function refreshAccessToken(req,res){
   const { token } = req.body;

    if (!token) {
        return res.status(400).send({ msg: "Token requerido" });
    }

    try {
        const { usuario_id } = decoded(token); // Decodificar el token y extraer usuario_id
        const response = await Datos.findOne({ _id: usuario_id });

        if (!response) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }

        const accessToken = await createAccessToken(response); // Generar nuevo token de acceso

        res.status(200).send({ accessToken: accessToken }); // Enviar el nuevo token de acceso
    } catch (error) {
        console.error("Error al refrescar el token:", error);
        res.status(500).send({ msg: "Error del servidor" });
    }
}

async function Correo(req, res) {
    const {
        usuario,
        contraseña,
        contraseña1,
        apellido,
        nombre,
        institucion,
        telefono,
        lugar,
        email
    } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await Datos.findOne({
            usuario: usuario,
            apellido_materno: apellido_materno,
            nombre: nombre,
            institucion: institucion,
            telefono: telefono,
            lugar: lugar
        });

        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }
        
        // Enviar el correo electrónico con los datos del usuario
        await sendEmail(user);

        return res.status(200).json({ message: "Datos enviados correctamente" });
    } catch (error) {
        console.error("Error al enviar los datos por correo:", error);
        return res.status(500).json({ error: "Error al enviar los datos por correo", msg });
    }
}


async function sendEmail(user) {
    // Configurar el transporte
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth: {
            user: "molina.hernandez.enri.cbta82@gmail.com",
            pass: "ksupkqzajslrgpkg"
        },
    });

    // Configurar los detalles del correo electrónico
    const mailOptions = {
        from: "molina.hernandez.enri.cbta82@gmail.com",
        to: user.email,
        subject: 'Detalles de la cuenta',
        text: `Nombre de usuario: ${user.usuario}\n contraseña: ${user.contraseña1}`
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
}


async function registro(req, res, next){
    try {
        const {
            id,
            Apellidos,
            Nombre,
            Matricula,
            active,
            asistencia,
            Id_maestro
        } = req.body;
        const alumno = new alumnos({
            Id_maestro,
            id,
            Apellidos,
            Nombre,
            Matricula,
            roles: "alumno", // Establecemos el rol como alumno
            active: true, // Activamos al alumno automáticamente
            asistencia,
        });
        const guardar = await alumno.save();
        res.status(200).json(guardar);
    } catch (error) {
        res.status(500).json({
            message: "Error al enviar",
            error: error.message
        });
        next(error);
    }
}

async function editar(req, res){
    try {
        const {
            id,
            Nombre,
            Apellidos,
            Matricula,
            asistencia
        } = req.body;
        const {_id}=req.params;
        // Buscar el alumno existente por su ID
        const alumnoExistente = await alumnos.findById(_id);
/*
        if(alumnoExistente.avatar){
            req.avatar=alumnoExistente.avatar
        }
  */      
        //const alumnoExistente = await alumnos.findById(id.toString());
       //const alumnoExistente = await alumnos.findOne({ Matricula });
        // Verificar si el alumno existe
        if (!alumnoExistente) {
            return res.status(404).json({ message: 'El alumno no existe' });
        }
        

        // Actualizar los datos del alumno existente
        alumnoExistente.Nombre = Nombre;
        alumnoExistente.Apellidos = Apellidos;
        alumnoExistente.Matricula = Matricula;
        alumnoExistente.asistencia = asistencia;

        // Guardar los cambios en la base de datos
        const datosActualizados = await alumnoExistente.save();

        res.json(datosActualizados); // Devuelve los datos actualizados al cliente
    } catch (error) {
        console.error('Error al actualizar el alumno:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
async function editarAsistencia(req, res) {
    try {
        const { asistencia } = req.body;
        const { _id } = req.params;

        const alumnoExistente = await alumnos.findById(_id);

        if (!alumnoExistente) {
            return res.status(404).json({ message: 'El alumno no existe' });
        }

        alumnoExistente.asistencia = asistencia;

        const datosActualizados = await alumnoExistente.save();

        res.json(datosActualizados);
    } catch (error) {
        console.error('Error al actualizar la asistencia del alumno:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


async function eliminar(req, res) {
    try {
        const {_id}=req.params; // Obtener la matrícula del alumno de los parámetros de la URL

        // Buscar el alumno por su matrícula y eliminarlo
        const alumnoEliminado = await alumnos.findByIdAndDelete(_id);

        // Verificar si el alumno existe y fue eliminado correctamente
        

        // Enviar una respuesta con el alumno eliminado
        res.status(200).json({ message: 'Alumno eliminado correctamente', alumno: alumnoEliminado });
    } catch (error) {
        console.error('Error al eliminar el alumno:', error);
        res.status(500).json({ message: 'Error al eliminar el alumno' });
    }

}



export {login,Correo,registro,editarAsistencia,editar,eliminar,refreshAccessToken
};





 