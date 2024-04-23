import mongoose from "mongoose";

const datosSchema = mongoose.Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    institucion: String,
    materia: String,
    semestre: String,
    sexo: String,
    email: String,
    telefono: Number,
    fecha_nacimiento: String,
    edad: Number,
    lugar: String,
    usuario: String,
    contraseña: String,
    imagen:String,
    roles:String,
    active:Boolean,
    avatar:String


});

const Datos = mongoose.model('Datos', datosSchema);

export default Datos;
