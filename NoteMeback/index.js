const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserRouter = require('./Routes/UserRouter');
const NotesRouter = require('./Routes/NotesRouter');
const ExcelRouter = require('./Routes/ExcelRouter');

const app = express()
require('dotenv').config();

app.use(cors({
    origin: '*', // Allow any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, etc.)
    optionsSuccessStatus: 204, // Respond to preflight requests with 204 No Content
}));

app.use(express.json());
app.use('/user', UserRouter);
app.use('/notes',NotesRouter);
app.use('/excel',ExcelRouter);

mongoose.connect('mongodb://127.0.0.1:27017/Learn').then(async() => {
    console.log("Connected to mongodb");
}).catch((err) => { console.log(err) })

app.listen(process.env.PORT, () => {
    console.log(`Server Running at ${process.env.PORT}`);
})
