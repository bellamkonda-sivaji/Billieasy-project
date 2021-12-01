CREATE DATABASE database2;


CREATE TABLE employee_data(
    employer_id SERIAL PRIMARY KEY,
    employer_name VARCHAR(300),
    employer_age INTEGER,
    employer_gender VARCHAR(300)
)

CREATE TABLE projects(
    projects_id SERIAL PRIMARY KEY,
    project_name VARCHAR(300),
    project_desription VARCHAR(300),
    employer_id INTEGER,
    CONSTRAINT fk_employer
    FOREIGN KEY (employer_id) REFERENCES employee_data(employer_id) ON DELETE CASCADE
)

CREATE TABLE staff_data(name VARCHAR (300));


