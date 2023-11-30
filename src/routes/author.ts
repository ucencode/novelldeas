import { Router } from "express";
import { list, find, create, update, destroy } from "../controllers/author";

import { checkJwt } from "../middlewares/checkJwt";
import { validate } from "../middlewares/validator/validate";
import { authorValidationRules } from "../middlewares/validator/authorValidationRules";

const router = Router();

router.get("/", [checkJwt], list);
router.get("/:id", [checkJwt], find);
router.post("/", authorValidationRules, [checkJwt, validate], create);
router.patch("/:id", authorValidationRules, [checkJwt, validate], update);
router.delete("/:id", [checkJwt], destroy);

export = router;