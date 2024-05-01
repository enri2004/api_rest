import mongoose from "mongoose";

const datosSchema = mongoose.Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    institucion: String,
    materia: String,
    semestre: String,
    sexo: String,
    email:String,
    telefono: Number,
    fecha_nacimiento:String,
    edad: Number,
    lugar: String,
    usuario: String,
    contraseña: String,
    contraseña1:String,
    roles:String,
    active:Boolean,
    clave:String,
    apellidos:String,
    matricula:String,

});

const Datos = mongoose.model('Datos', datosSchema);

export default Datos;
