import mongoose from "mongoose";

const datosSchema = mongoose.Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    institucion: String,
    materia: String,
    semestre: String,
    sexo: String,
    email:{
        type:"String",
        required:true,
        unique:true
        
    },
    telefono: Number,
    fecha_nacimiento: String,
    edad: Number,
    lugar: String,
    usuario: String,
    contraseña: String,
    contraseña1:String,
    roles:String,
    active:Boolean,


});

const Datos = mongoose.model('Datos', datosSchema);

export default Datos;
