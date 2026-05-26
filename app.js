require('dotenv').config()
const express = require('express');
const DBCon = require('./app/config/db');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./app/config/swagger");


const app = express();

DBCon();


app.use(express.json());
app.use(express.urlencoded({ extended : true }))


const Router = require('./app/routes');
app.use(Router);


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: `
      th.col_header.response-col_links,
      td.response-col_links {
        display: none;
      }
    `
  })
);


const PORT = 3006;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    
})