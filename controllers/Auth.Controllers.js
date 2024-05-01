import Datos from '../models/Datos.models.js';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";

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
export {login};
async function Correo(req, res) {
    const {
        usuario,
        contraseña,
        apellido_paterno,
        apellido_materno,
        nombre,
        institucion,
        telefono,
        lugar
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
        await sendEmail(user.email, user.usuario);

        return res.status(200).json({ message: "Datos enviados correctamente" });
    } catch (error) {
        console.error("Error al enviar los datos por correo:", error);
        return res.status(500).json({ error: "Error al enviar los datos por correo" });
    }
}

async function sendEmail(email, usuario, contraseña) {
    // Configurar el transporte para enviar correos electrónicos
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Agrega tus credenciales de correo electrónico
            pass: process.env.EMAIL_PASSWORD
        },
    });

    // Configurar los detalles del correo electrónico
    const mailOptions = {
        from: process.env.EMAIL_USER, // Dirección de correo electrónico del remitente
        to: email, // Dirección de correo electrónico del destinatario
        subject: 'Detalles de la cuenta', // Asunto del correo electrónico
        text: `Nombre de usuario: ${usuario}\nContraseña: ${contraseña}` // Cuerpo del correo electrónico
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
}



export default Correo;





 