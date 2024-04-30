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


async function correo(req,res){
    const [
        usuario,
        contraseña,
        apellido_paterno,
        apellido_materno,
        nombre,
        institucion,
        email,
        telefono,
        edad,
        lugar,]=req.body

    try{
        const user= await Datos.findOne({nombre:nombre,
        usuario:usuario,
        apellido_paterno:apellido_paterno,
        apellido_materno:apellido_materno,
        institucion:institucion,
        email:email,
        telefono:telefono,
        edad:edad,
        lugar:lugar});

        if(!user){
            return res.status(400).json({error:"error"});
        }
        const password=  await  bcrypt.compare(req.body.contraseña, user.contraseña);
        const usuario=user.usuario;
        await sendEmail(correo, password,usuario);
        return res.status(200).json({Message:"se enviaron los datos"});
    }catch(error){
        console.error("no se envio los datos");
    }
}

async function sendEmail(email, user) {
    // Configurar el transporte
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    // Configurar los detalles del correo electrónico
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Detalles de la cuenta',
        text: `Nombre de usuario: ${user.usuario}\nContraseña: ${user.contraseña}`
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
}


export {correo,login};





 