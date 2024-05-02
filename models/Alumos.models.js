import mongoose from "mongoose";

const alumnoSchema = mongoose.Schema({
    Nombre: String,
    Apellidos:String,
    //institucion: String,
    Matricula:String,
    roles:String,
    active:Boolean,
    id:Number,

});

const alumnos = mongoose.model('alumnos', alumnoSchema);

export default alumnos;
