/*const jwt=require("jsonwebtoke");

function createAccessToken(Usuario){
    const expToken=new Date();
    expToken.setHours(expToken.getHours()+3);

    const payLoad={
        toke_type:"access",
        Usuario_id:Usuario._id,
        iat:Date.now(),
        exp:expToken.getTime()
    }
    return jwt.sign(payLoad,"palabrasecreta");

}*/