import { Router } from "express";
import { addUser, getAllUsers, loginUser } from "../controllers/userAccountsControllers";
import authorizationMiddleware from "../middlewares/authorizationMiddleware";
import userAccountsMiddlewares from "../middlewares/userAccountsMiddlewares";

const router = Router();

router.use(userAccountsMiddlewares)
router.post("/signup", addUser);
router.post("/login", loginUser);

router.use(authorizationMiddleware);
router.get("/", getAllUsers);

export default router;