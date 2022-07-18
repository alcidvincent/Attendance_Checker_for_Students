import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { UserAccounts } from "../database/entity/UserAccounts";
import bcrypt from "bcrypt"

export const loginUser = async (req: Request, res: Response) => {
    const body: UserAccounts = req.body;
    const userAccountsRepository = AppDataSource.getRepository(UserAccounts);
    const user = await userAccountsRepository.findOneBy({
        username: body.username
    });

    bcrypt.compare(body.password, user.password).then(function(result: boolean) {
        if(result) {
            return res.status(200).send({
                "message":"Request successful",
                "data": user
            })
        } else {
            return res.status(401).send({
                "message": "Login failed"
            })
        }
    });
}

export const addUser = (req: Request, res: Response) => {
    const body = req.body;
    try {
        const userAccountsRepository = AppDataSource.getRepository(UserAccounts);
        const saltRounds = parseInt(process.env.SALT_ROUNDS)
        // password encryption
        bcrypt.hash(body.password, saltRounds, async function(err, hash) {
            if(err) {
                throw new Error("Password hashing failed")
            }
            const dataWithEncryptedPW = {...body, password: hash}
            const newAccount = await userAccountsRepository.save(dataWithEncryptedPW)
            return res.status(201).send({
                message: "User added successfully",
                data: newAccount
            })
        });
    } catch (error) {
        return res.status(500).send({
            message: `Error encountered: ${error}`
        });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userAccountsRepository = AppDataSource.getRepository(UserAccounts);
        const userAccounts = await userAccountsRepository.find()
        return res.status(201).send({
            message: "Request successful",
            data: userAccounts
        });
    } catch (error) {
        return res.status(500).send({
            message: `Error encountered: ${error}`
        });
    }
}