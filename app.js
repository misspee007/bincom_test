const express = require("express");
const appRouter = require('./src/routes/app.routes');
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/', appRouter);

app.get("/", (req, res) => {
  res.status(200).json({status: "true"});
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
