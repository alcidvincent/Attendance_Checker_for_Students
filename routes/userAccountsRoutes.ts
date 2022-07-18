import { Router } from "express";
import { addUser, getAllUsers, loginUser } from "../controllers/userAccountsControllers";
import authorizationMiddleware from "../middlewares/authorizationMiddleware";
import userAccountsMiddleware from "../middlewares/userAccountsMiddlewares";

const router = Router();

router.use(userAccountsMiddleware);

router.post("/login", loginUser);
router.post("/signup", addUser);

router.use(authorizationMiddleware);

router.get("/", getAllUsers);

export default router;