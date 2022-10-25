const express = require("express");
const router = express.Router();

const statisticalControllers = require("../controllers/statisticalControllers");
const middlewareController = require("../controllers/middlewareController");

router.get(
  "/get-number-doing",
  middlewareController.verifyToken,
  statisticalControllers.getNumberDoing
);
//official contract
router.get(
  "/get-number-official-contract",
  middlewareController.verifyToken,
  statisticalControllers.getNumberOfficialContract
);
//Probationary contracts
router.get(
  "/get-number-probationary-contract",
  middlewareController.verifyToken,
  statisticalControllers.getNumberProbationaryContracts
);
//quit
router.get(
  "/get-number-quitt",
  middlewareController.verifyToken,
  statisticalControllers.getNumberQuit
);
//birthday
router.get(
  "/get-birthday",
  middlewareController.verifyToken,
  statisticalControllers.birthday
);

//get all sinh nhat
router.get(
  "/get-birthday-all",
  middlewareController.verifyToken,
  statisticalControllers.birthdayGellAll
);

//sinh nhật hôm nay
router.get(
  "/get-birthday-today",
  middlewareController.verifyToken,
  statisticalControllers.birthdayToday
);

//signed contract
router.get(
  "/get-signed-contract",
  middlewareController.verifyToken,
  statisticalControllers.SignedContract
);
//get all signed contract
router.get(
  "/get-signed-contract-all",
  middlewareController.verifyToken,
  statisticalControllers.SignedContractGellAll
);

module.exports = router;
