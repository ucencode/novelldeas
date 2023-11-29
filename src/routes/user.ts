import { Router } from "express";
import { list, find, update, destroy } from "../controllers/user";

import { checkJwt } from "../middlewares/checkJwt";
import { validate } from "../middlewares/validator/validate";
import { updateValidationRules } from "../middlewares/validator/userValidationRules";

const router = Router();

router.get("/", [checkJwt], list);
router.get("/:id", [checkJwt], find);
router.patch("/:id", updateValidationRules, [checkJwt, validate], update);
router.delete("/:id", [checkJwt], destroy);

export = router;