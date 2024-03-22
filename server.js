const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const cors = require("cors");
const { userRouter } = require("./Router/userRoutes");
const { blogRouter } = require("./Router/blogRouters");
require("./mongoose")
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
require('dotenv').config();


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'A sample API',
      },
      servers:[
        {
        url:'http://localhost:5000'
      }
    ]
    },
      // Path to the API specs
  apis: ['./server.js'], // Path to the API routes
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.get('/abc',(req,res)=>{
    res.send("hello")
})


app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running at ${process.env.PORT}`)
});

