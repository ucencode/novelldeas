import { Router } from "express";

import { list, find, create } from "../controllers/transaction";

import { checkJwt } from "../middlewares/checkJwt";
import { validate } from "../middlewares/validator/validate";
import { transactionValidationRules } from "../middlewares/validator/transactionValidationRules";

const router = Router();

router.get("/", [checkJwt], list);
router.get("/:id", [checkJwt], find);
router.post("/", transactionValidationRules, [checkJwt, validate], create);

export = router;