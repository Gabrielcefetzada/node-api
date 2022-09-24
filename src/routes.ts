import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController";
import { AuthController } from "./controllers/AuthController";
import { CreateComplimentController } from "./controllers/ComplimentsController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthController();
const createComplimentController = new CreateComplimentController();

router.post("/users", createUserController.handle);
router.post("/tags", createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("compliment", createComplimentController.handle);

export { router };