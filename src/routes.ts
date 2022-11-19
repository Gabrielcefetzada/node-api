import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController";
import { AuthController } from "./controllers/AuthController";
import { CreateComplimentController } from "./controllers/ComplimentsController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { RefreshTokenController } from "./controllers/RefreshTokenController";
import { GetTagsController } from "./controllers/GetTagsController";
import { GetUserController } from "./controllers/GetUserController";
import { TurnsUserAdminController } from "./controllers/TurnsUserAdminController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthController();
const createComplimentController = new CreateComplimentController();
const refreshTokenController = new RefreshTokenController();

const getTagsController = new GetTagsController();
const getUserController = new GetUserController();

const turnsUserAdminController = new TurnsUserAdminController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliment", ensureAuthenticated, createComplimentController.handle);
router.post("/refresh-token", refreshTokenController.handle); 

router.get("/tags", ensureAuthenticated, getTagsController.handle);
router.get("/user", ensureAuthenticated, getUserController.handle);

router.patch("/turns-admin", turnsUserAdminController.handle)

export { router };