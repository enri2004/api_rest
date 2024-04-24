import express from "express";
import cors from "cors";
import router from "./routes/Datos.routes.js";
import mongoose from "mongoose";
import  {  DB_USER, DB_PASSWORD,DB_HOST,DB_NAME}   from "./constantes.js"

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


app.listen(port, () => {
    console.log(`Servidor API REST escuchando en el puerto: ${port}`);
});
