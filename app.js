const express = require("express");
const app = express();
const pool =require("./db");

app.use(express.json())

app.get("/employees/", async (request, response) => {
    try{
    const data=await pool.query(
      `
      SELECT
        *
      FROM
        employee_data;`
    )
    response.json(data.rows)
    }
    catch(error){
      console.log(error.message)
    }
    
  });

app.listen(3000, () => {
    console.log("https://localhost:3000/");
    console.log("hello")
    
  })