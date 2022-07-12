import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { UserAccounts } from "../database/entity/UserAccounts";

export const addUser = async (req: Request, res: Response) => {
    const body = req.body;
    try {
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
    
        const userAccountsRepository = AppDataSource.getRepository(UserAccounts);
        const newAccount = await userAccountsRepository.save(body)
        return res.status(201).send({
            message: "User added successfully",
            data: newAccount
        })
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