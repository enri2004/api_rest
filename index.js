import express from "express";
import mysql from "mysql2";
import cors from "cors"; 
import router from "./routes/index.js"; // Cambié la importación de router

const app = express();
const port = 5000;

// Habilitar CORS para permitir solicitudes desde otros dominios
app.use(cors());

// Configuración para procesar datos en formato JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'basesdedatos'
});

db.connect((err) => {
    if (err) {
        console.error("Error en la conexión a la base de datos:", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos");
});

// Usar el enrutador en la aplicación, las rutas se definen en otro archivo
app.use("/api", router);

// Ruta GET para obtener datos
app.get('/api/datos', async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM identificacion");
        return res.json(rows);
    } catch (err) {
        console.error("Error al obtener los datos:", err);
        res.status(500).send("Error al obtener los datos");
    }
});

app.get('/api/tabla', async (req, res) => {
    try {
        let query;
        const tabla = req.query.tabla;
        if (tabla === "inventario") {
            query = "SELECT * FROM inventario";
        } else if (tabla === "paciente") {
            query = "SELECT * FROM paciente";
        } else if (tabla === "personal") {
            query = "SELECT * FROM identificacion"; // Corrección aquí
        } else {
            return res.status(400).send("Tabla no válida");
        }

        const [rows] = await db.promise().query(query); // Ejecutar la consulta
        res.json(rows); // Enviar la respuesta con los datos
    } catch (err) {
        console.error("Error al obtener los datos:", err);
        res.status(500).send("Error al obtener los datos");
    }
});

app.listen(port, () => {
    console.log(`Servidor API REST escuchando en el puerto: ${port}`);
});
