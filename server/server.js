// using env variables
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// using cors to allow cross origin requests
const cors = require('cors');
// express app
const app = express();


app.use(express.json());
//middlewares
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');




const userRoutes=require('./routes/userRoutes');
const projectRoutes = require('./routes/projects');
// access to cross origin requests
app.use(cors({
    origin: '*',
    methods: ['GET','POST','PUT','DELETE','PATCH']
}
));
// access to req.body
app.use(express.json());
// global middleware
app.use((req,res,next) => {
    console.log('Middleware Info:');
    console.log("Path: " + req.path, "Method: " + req.method, "Request Body: " + JSON.stringify(req.body));
    next();
})

//users
app.use('/api/users',userRoutes);

// routes
app.use('/api/projects',projectRoutes);

app.use(notFound);
app.use(errorHandler);
// connect to db, returns a promise
mongoose.connect(process.env.MONGO_URI)
.then((result) => {
    // listen for requests once connected to db
    // console.log(result);
    app.listen(process.env.PORT, () => {
        console.log('Connected to DB & listening on port ' + process.env.PORT);
    })
})
.catch((err) => {
    console.log(err);
})





