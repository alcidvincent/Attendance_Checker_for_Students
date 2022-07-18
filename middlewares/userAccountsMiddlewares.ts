import { Router } from "express"; 

const router = Router();

router.post("/login", (req, res, next) => {
    const body = req.body
    if(!body) {
        return res.status(422).send({
            message: "No data"
        });
    }

    if(!body.username) {
        return res.status(422).send({
            message: "Missing username"
        });
    }

    if(!body.password) {
        return res.status(422).send({
            message: "Missing password"
        });
    }

    return next()
})

router.post("/signup", (req, res, next) => {
    const body = req.body
    if(!body) {
        return res.status(422).send({
            message: "No data"
        });
    }

    if(!body.username) {
        return res.status(422).send({
            message: "Missing username"
        });
    }

    if(!body.emailAddress) {
        return res.status(422).send({
            message: "Missing email address"
        });
    }

    if(!body.password) {
        return res.status(422).send({
            message: "Missing password"
        });
    }

    return next()
})

export default router;