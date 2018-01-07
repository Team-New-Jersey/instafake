var Sequelize = require("sequelize");

var sql;

if (process.env.DATABASE_URL) {
	sql = new Sequelize(process.env.DATABASE_URL);
}
else {
	sql = new Sequelize({
		database: "instabase",
		username: "postgres",
		password: "Coyot3$mith!511",
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 1234,
		dialect: "postgres",
		logging: false,
	});
}

module.exports = sql;