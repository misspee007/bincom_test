const mysql = require("mysql");
require("dotenv").config();

// Create connection
// mysql://root:3DNDPB3NpKizRCGgQ7wl@containers-us-west-115.railway.app:7919/railway
// mysql -hcontainers-us-west-115.railway.app -uroot -p3DNDPB3NpKizRCGgQ7wl --port 7919 --protocol=TCP railway
// connect
const db = mysql.createConnection({
  connectionUri: process.env.MYSQL_CONECTION_URI,
});

// const db = mysql.createConnection({
// 	host: process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME,
// });

// Connect to MySQL
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("MySQL Connected...");
});

module.exports = db;