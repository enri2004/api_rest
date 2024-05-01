import Datos from '../models/Datos.models.js';
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

async function alumnos(req , res){
    try {const{
        nombre,
	    apellidos,
        matricula,
    }=req.body
const alumno= new Datos({
        nombre,
	    apellidos,
        matricula,
     
        
});

const guardar = await alumno.save();
res.status(200).json(guardar);
} catch (error) {
res.status(500).send({
  message: "Error al enviar",
  error: error.message
});
}

}



export {login,Correo,alumnos};





 