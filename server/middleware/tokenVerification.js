import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next ) => {

    const {Authorization} = req.header;


    const authHeader = Authorization.split(" ");
    if(authHeader[0] == "Bearer"){

        jwt.verify(authHeader[1], process.env.SECRET_TOKEN, (err, decoded)=>{

            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }

            request.account = decoded.account

            next();
        })
        

    }


}