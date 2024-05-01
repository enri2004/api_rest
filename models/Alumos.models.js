import mongoose from "mongoose";

const alumnoSchema = mongoose.Schema({
    nombre: String,
    Apellidos:String,
    institucion: String,
    Matricula:String,
    roles:String,

});

const alumnos = mongoose.model('alumnos', alumnoSchema);

export default alumnos;
