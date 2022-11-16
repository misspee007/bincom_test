const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const PORT = process.env.PORT;

// Create connection
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("MySQL Connected...");
});

const app = express();

app.use(express.json());

// Get the result for any individual polling unit
app.get("/result/polling-unit/:id", (req, res) => {
	const id = req.params.id;
	let sql = `SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid = ${id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
});

// Get the summed total result of all the polling_unit under any particular lga
app.get("/result/lga/:id", (req, res) => {
	const id = req.params.id;
	// get all polling units under the lga
	let sql = `SELECT SUM(a.party_score) AS party_score, a.party_abbreviation FROM announced_pu_results a JOIN polling_unit p WHERE p.uniqueid=a.polling_unit_uniqueid AND p.lga_id=${id} GROUP BY a.party_abbreviation`;

	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
	});
});

// store the results for all parties for a new polling unit
app.post("/polling-unit/new", (req, res) => {
	let sql = `INSERT INTO announced_pu_results (polling_unit_uniqueid, party_abbreviation, party_score, entered_by_user, date_entered, user_ip_address) VALUES ?`;

	// get date entered
	const date = new Date();
	const dateEntered = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

	// get user ip address
	const ipAddress = req.ip;

	// get values from the request body
	let values = req.body;

  // create an array of arrays to be inserted into the database
  let data = [];
  for (let i = 0; i < Object.keys(values).length; i++) {
    data.push([
      values[i].polling_unit_uniqueid,
      values[i].party_abbreviation,
      values[i].party_score,
      values[i].entered_by_user,
      dateEntered,
      ipAddress,
    ]);
  }

  // insert the data into the database
	let query = db.query(sql, [data], (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send("New polling unit result added...");
	});
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
