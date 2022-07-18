import { Router } from "express"; 

const router = Router();

router.use("/", (req, res, next) => {
    try {
        console.log("Middleware")
        const authorization = req.headers.authorization;
        if(authorization) {
            if(authorization.split(' ').length === 2 ) {
                const [tokenType, bearerToken] = authorization.split(' ')
                if(tokenType === "Bearer") {
                    console.log(bearerToken)
                    next()
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