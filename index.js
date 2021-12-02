const express = require("express");
const app = express();
const pool =require("./db");

app.use(express.json())



//Routes//

app.post("/employees/",async (request,response)=>{
  try{
    const {employerName,employerAge,employerGender}=request.body;
    const data=await pool.query(
      "INSERT INTO employee_data(employer_name,employer_age,employer_gender) VALUES ($1,$2,$3) RETURNING *",
        [employerName,employerAge,employerGender]
        
        )
        
        console.log(employerName,employerAge,employerGender)
    
    response.json(data.rows)
  }

  catch(error){
    console.error(error.message)
  }
});


//projects

app.post("/projects/",async (request,response)=>{
  try{
    const {projectName,projectDescription,employerId}=request.body;
    const data=await pool.query(
      "INSERT INTO projects(project_name,project_description,employer_id) VALUES ($1,$2,$3) RETURNING *",
        [projectName,projectDescription,employerId]
        
        )
        
        console.log(projectName,projectDescription,employerId)
    
    response.json(data.rows)
  }

  catch(error){
    console.error(error.message)
  }
});

//employers all data

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

//get projects

app.get("/projects/", async (request, response) => {
  try{
  const data=await pool.query(
    `
    SELECT
      *
    FROM
      projects;`
  )
  response.json(data.rows)
  }
  catch(error){
    console.log(error.message)
  }
  
});



//employers data based on id
app.get("/employees/:employerId/", async(request,response)=>{
  try{

    const {employerId}=request.params
    const data=await pool.query(
    "SELECT * FROM employee_data WHERE employer_id= ($1) ",
    [employerId]
  
    )
    response.json(data.rows)
    console.log(employerId)

  }
  catch(error){
    console.log(error.message)

  }

})

//JOINS TABLES

app.get("/join/conditions/", async (request, response) => {
  try{

    const {employerId}=request.params

  const data=await pool.query(
    `
    SELECT
      *
    FROM
      employee_data INNER JOIN projects
      ON employee_data.employer_id=projects.employer_id`
  )
  response.json(data.rows)
  }
  catch(error){
    console.log(error.message)
  }
  
});


//PUT DATA

app.put("/employees/:employerId/",async(request,response)=>{
  try{
    const {employerId}=request.params;
    const {employerName,employerAge,employerGender}=request.body;
    const data=await pool.query(
      "UPDATE employee_data SET employer_name=($1),employer_age=($2),employer_gender=($3) WHERE employer_id=($4)",
      [employerName,employerAge,employerGender,employerId]
      
    )
    response.json("employers were updated")
    console.log('employers were updated')
  }
  catch(error){
    console.log(error.message)
  }

});

//DELETE DATA

app.delete("/employees/:employerId/",async(request,response)=>{
  try{
    const {employerId}=request.params;
    const data=await pool.query(
      "DELETE FROM employee_data WHERE employer_id= ($1) ",
      [employerId]
    )
    response.json("Employers were successfully deleted")
    console.log("Employers were successfully deleted")
  }
  catch(error){
    console.log(error.message)

  }
});



app.listen(3000, () => {
  console.log("https://localhost:3000/");
  console.log("hello")
})