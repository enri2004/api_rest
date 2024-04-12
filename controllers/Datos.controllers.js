import mongoose from "mongoose";

const datosSchema = mongoose.Schema({
    nombre: String,
    contraseña: String,
    apellido_paterno: String,
    apellido_materno: String,
    institucion: String,
    materia: String,
    semestre: String,
    sexo: String,
    email: String,
    telefono: Number,
    fecha_nacimiento: Date,
    edad: Number,
    lugar: String,
    usuario: String, // Assuming this is for authentication purposes
});

const Datos = mongoose.model('Datos', datosSchema);
export default Datos;


