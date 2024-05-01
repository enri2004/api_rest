import mongoose from "mongoose";

const alumnoSchema = mongoose.Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    institucion: String,
    roles:String,

});

const alumnos = mongoose.model('alumnos', alumnoSchema);

export default alumnos;
