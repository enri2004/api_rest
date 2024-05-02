import Datos from '../models/Datos.models.js';
import alumnos from '../models/Alumos.models.js';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';



dotenv.config();

async function login(req, res) {
    const { usuario, contraseña } = req.body;

    try {
        if (!usuario) return res.status(400).send({ msg: "El usuario es obligatorio" });
        if (!contraseña) return res.status(400).send({ msg: "La contraseña es obligatoria" });

        const usuariollowerCase = usuario.toLowerCase();

        const response = await Datos.findOne({ usuario: usuariollowerCase });
        if (!response) {
            return res.status(400).send({ msg: "Usuario no encontrado" });
        }

        bcrypt.compare(contraseña, response.contraseña, (bcryptError, check) => {
            
            if (bcryptError) {
                return res.status(500).send({ msg: "Error del usuario" });
            } else if (!check) {
                return res.status(400).send({ msg: "Contraseña incorrecta" });

            } else {
                return res.status(200).send({ msg: "Usuario logueado correctamente", roles:response.roles });
            }
        });
    } catch (error) {
        return res.status(500).send({ msg: "Error al autentificar", error: error.message });
    }
}

async function Correo(req, res) {
    const {
        usuario,
        contraseña,
        contraseña1,
        apellido_paterno,
        apellido_materno,
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
            apellido_paterno: apellido_paterno,
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
        return res.status(500).json({ error: "Error al enviar los datos por correo" });
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
            //institucion,
            Matricula,
            active,
            asistencia,
        } = req.body;

        const alumno = new alumnos({
            id,
            Apellidos,
            Nombre,
            //institucion,
            Matricula,
            roles: "alumno", // Establecemos el rol como alumno
            active: true, // Activamos al alumno automáticamente
            asistencia,
        });
/*
        const existingAlumno = await Datos.findOne({ matricula });
        if (existingAlumno) {
            return res.status(400).json({ error: 'La matrícula ya está en uso' });
        }
*/
        const guardar = await alumno.save();
        res.status(200).json(guardar);
        console.log("mmm")
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

        // Buscar el alumno existente por su ID
       // const alumnoExistente = await alumnos.findById(id);const alumnoExistente = await alumnos.findById(id.toString());
       const alumnoExistente = await alumnos.findOne({ Matricula });
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


async function eliminar(req, res) {
    try {
        const matriculaAlumno = req.params.Matricula; // Obtener la matrícula del alumno de los parámetros de la URL

        // Buscar el alumno por su matrícula y eliminarlo
        const alumnoEliminado = await alumnos.findOneAndDelete({ Matricula: matriculaAlumno });

        // Verificar si el alumno existe y fue eliminado correctamente
        if (!alumnoEliminado) {
            return res.status(404).json({ message: 'El alumno no existe' });
        }

        // Enviar una respuesta con el alumno eliminado
        res.status(200).json({ message: 'Alumno eliminado correctamente', alumno: alumnoEliminado });
    } catch (error) {
        console.error('Error al eliminar el alumno:', error);
        res.status(500).json({ message: 'Error al eliminar el alumno' });
    }
}



export {login,Correo,registro,editar,eliminar};





 