import express from "express";
import cors from "cors";
import routes from "./routes/Datos.routes";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose.Promise = global.Promise;
const dbUrl = 'mongodb+srv://Cluster:BZ5ii1h90MDMoEgr@cluster.28qg27o.mongodb.net/informacion';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos en el puerto 27017'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});
