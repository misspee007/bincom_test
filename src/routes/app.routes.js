const express = require('express');
const appController = require("../controllers/app.controller");

const appRouter = express.Router();

// Get the result for any individual polling unit
appRouter.get("/result/polling-unit/:id", appController.getPuResults);

// Get the summed total result of all the polling_unit under any particular lga
appRouter.get("/result/lga/:id", appController.getLgaResults);

// store the results for all parties for a new polling unit
appRouter.post("/polling-unit/new", appController.addNewPuResult);

module.exports = appRouter;