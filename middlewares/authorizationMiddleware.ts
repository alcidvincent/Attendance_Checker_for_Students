import { Router } from "express"; 
import jwt from "jsonwebtoken"

const router = Router();

router.use("/", (req, res, next) => {
    try {
        var authorization = req.headers.authorization;
        if(authorization) {
            if(authorization.split(' ').length === 2 ) {
                var [tokenType, bearerToken] = authorization.split(' ')
                if(tokenType === "Bearer") {
                    jwt.verify(bearerToken, process.env.JWT_SECRET, function (err, decoded){
                        if (err) 
                        return res.status(401).send({
                            "message": "You are not authorized"
                        })
                        next()
                    });  
                } else {
                    return res.status(401).send({
                        "message": "You are not authorized"
                    })
                }
            } else {
                return res.status(401).send({
                    "message": "You are not authorized"
                })
            }
        } else {
            return res.status(401).send({
                "message": "You are not authorized"
            })
        }
    } catch (error) {
        return res.status(500).send({
            "message": "Error encountered"
        })
    }
})

export default router;