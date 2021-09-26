const mysql = require("mysql");

const con = mysql.createConnection({
    connectionLimit: 100,
    host: "18421_aloes.skylo-pl.atthost24.pl",
    user: "18421_aloes",
    password: "SwinkaPeppa-31",
    database: "18421_aloes"
});

module.exports = con;
