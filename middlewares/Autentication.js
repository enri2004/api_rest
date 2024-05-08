import { decoded
}from "../utils/jwt.js"

function asureAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({
            msg:"La cabacera no tiene la peticion"
        })
    }
    const token=req.headers.authorization.replace("Bearer ","");

    try {
        const payload = decoded(token);

        const {exp}=payload;
        const currentData=new Date().getTime();

        if(exp <= currentData){
            return res.status(400).send({
                msg: "El token ah expirado"
            })
        }

        req.usuario=payload;

        next();
        
    } catch (error) {
        return res.status(400).send({
            msg: "Token no encontrado o no valido"
        })
    }
}


export default asureAuth