import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next ) => {


    try{
            
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;


        if(authHeader && authHeader.startsWith("Bearer")){

            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{

                if(err){
                    res.status(401);
                    throw new Error("User is not authorized");
                }

                req.account = decoded.account

                next();
            });

            if(!token){
                res.status(401);
                throw new Error("User is not authorized or token is missing");
            }
        }
    }catch(error){
        console.log('error in validation');
    }


}