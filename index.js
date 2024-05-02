import express from "express";
import cors from "cors";
import router from "./routes/Datos.routes.js";
import mongoose, { Schema } from "mongoose";
import { registro } from "./controllers/Auth.Controllers.js";
//import  {  DB_USER, DB_PASSWORD,DB_HOST,DB_NAME}   from "./constantes.js"

const app = express();
const port = 3000;

mongoose.Promise = global.Promise;
const dbUrl = 'mongodb+srv://Cluster:BZ5ii1h90MDMoEgr@cluster.28qg27o.mongodb.net/informacion';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const Datos = mongoose.model('Datos');

app.get('/datos', async (req, res) => {
    try {
        // Consultar datos utilizando el modelo
        const datos = await Datos.find();
        // Enviar respuesta con los datos
        res.json(datos);
    } catch (error) {
        console.error('Error al recuperar datos:', error);
        res.status(500).json({ error: 'Error al recuperar datos' });
    }
});

async function eliminar(req, res, next) {
    try {
        const idAlumno = req.params.id; // Obtener el ID del alumno de los parámetros de la URL

        // Buscar el alumno por su ID y eliminarlo
        const alumnoEliminado = await alumnos.findByIdAndDelete(idAlumno);

        // Verificar si el alumno existe y fue eliminado correctamente
        if (!alumnoEliminado) {
            return res.status(404).json({ message: 'El alumno no existe' });
        }

        // Enviar una respuesta con el alumno eliminado
        res.status(200).json({ message: 'Alumno eliminado correctamente', alumno: alumnoEliminado });
    } catch (error) {
        console.error('Error al eliminar el alumno:', error);
        res.status(500).json({ message: 'Error al eliminar el alumno' });
    }
}


const alumnos = mongoose.model('alumnos');

app.get('/alumnos', async (req, res) => {
    try {
        // Consultar datos utilizando el modelo
        const datos = await alumnos.find();
        // Enviar respuesta con los datos
        res.json(datos);
    } catch (error) {
        console.error('Error al recuperar datos:', error);
        res.status(500).json({ error: 'Error al recuperar datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor API REST escuchando en el puerto: ${port}`);
});
