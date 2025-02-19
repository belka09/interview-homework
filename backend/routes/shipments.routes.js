const express = require("express");
const router = express.Router();
const shipmentsController = require("./../controllers/shipments.controller");

router.get("/", shipmentsController.getAll);
router.get("/:id", shipmentsController.getById);
router.post("/", shipmentsController.create);
router.put("/:id/status", shipmentsController.updateStatus);

module.exports = router;
