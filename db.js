const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"database",
    database:"database2",
    
    port:5432
});

module.exports =pool;
