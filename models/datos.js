import mysql from "mysql2/promise"; // Asegúrate de usar mysql2 con promesas

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'basesdedatos'
});
/*
const paciente = {
    // Función para insertar datos en la tabla de pacientes
    async save(data) {
        const { ididentificacion, nombre, edad, nacionalidad, identificacioncol, ubicacion, identificacioncol1 } = data;
        const query = `INSERT INTO identificacion (ididentificacion, nombre, edad, nacionalidad, identificacioncol, ubicacion, identificacioncol1)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

        try {
            const [result] = await db.query(query, [ididentificacion, nombre, edad, nacionalidad, identificacioncol, ubicacion, identificacioncol1]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    
    // Función para buscar todos los pacientes
    async findAll() {
        const query = `SELECT * FROM identificacion`;
        try {
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};*/

const saveDatos={
    async savePaciente(data){
        const {ididentificacion, nombre, edad, nacionalidad, identificacioncol, ubicacion, identificacioncol1}=data;
        const query=`INSERT INT identificacion(ididentificacion, nombre, edad, nacionalidad, identificacioncol, ubicacion, identificacioncol1)
        VALUE(?,?,?,?,?,?,?)`;
        try{
            const [resultado] = await db.query(query,[ididentificacion, nombre, edad, nacionalidad, identificacioncol, ubicacion, identificacioncol1])
            return resultado
        }catch(error){
            throw error
        }
    },


    async savePersonal(data){
        const {}=data
        const query = `INSERT INTO Personal()
        VALUE()`;
        try{
            const [resul] = await db.query(query,[])
            return resul
        }catch(error){
            throw error
        }
    },


async saveInventario(data){
    const {}= data
    const query = `SELECT * INTO Inventario()
    VALUE()`;
try {
    const [resulta] = await db.query(query,[])
    return resulta
}catch(error){
 throw error
}
},





    
async findAll(tabla){

    const query =`SELECT * FROM ${tabla}`
    try{
        const [rows] = await db.query(query);
        return rows;
    }catch(error){
        throw error
    }

}


}









const perfil_login = {
    async findAll(tabla, usuario, contraseña,idperfil) {
        try {
            let query;
            let rows;
            if (tabla === "login") {
                query = "SELECT * FROM login WHERE Usuario = ? AND Contraseña = ?";
                [rows] = await db.query(query, [usuario, contraseña]);
            } else if (tabla === "perfil") {
                query = "SELECT * FROM perfil WHERE idperfil = ?";
                [rows] = await db.query(query, [idperfil]);
            } else {
                return null; 
            }

            if (rows && rows.length > 0) {
                return rows[0]; 
            } else {
                return null; 
            }
        } catch (error) {
            console.error("Error al buscar los datos", error);
            throw error;  
        }
    }
};


export  {saveDatos, perfil_login};
