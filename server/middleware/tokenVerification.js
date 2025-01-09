import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next ) => {

    const {Authorization} = req.header;


    const authHeader = Authorization.split(" ");
    if(authHeader[0] == "Bearer"){

        jwt.sign(authHeader[1], process.env.SECRET_TOKEN)
        

    }


}