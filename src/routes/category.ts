import { Router } from "express";
import { list, find, create, update, destroy } from "../controllers/category";

import { checkJwt } from "../middlewares/checkJwt";
import { validate } from "../middlewares/validator/validate";
import { categoryValidationRules } from "../middlewares/validator/categoryValidationRules";

const router = Router();

router.get("/", [checkJwt], list);
router.get("/:id", [checkJwt], find);
router.post("/", categoryValidationRules, [checkJwt, validate], create);
router.patch("/:id", categoryValidationRules, [checkJwt, validate], update);
router.delete("/:id", [checkJwt], destroy);

export = router;