import mongoose from "mongoose";

const datosSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    institucion: String,
    materia: String,
    semestre: String,
    sexo: String,
    email:String,
    telefono: Number,
   fecha_nacimiento:Number,
    edad: Number,
    lugar: String,
    usuario: String,
    contraseña: String,
    contraseña1:String,
    roles:String,
    active:Boolean,
    avatar:String,
    Id_maestro:String,
});

const Datos = mongoose.model('Datos', datosSchema);

export default Datos;
