const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const client = require('./Redis')


const UserRouter = require('./Routes/UserRouter');
const ExcelRouter = require('./Routes/ExcelRouter');
const MyDataRouter = require('./Routes/MyDataRouter');

const app = express()
require('dotenv').config();

app.use(cors({
    origin: '*', // Allow any origin
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, // Allow credentials (cookies, etc.)
    optionsSuccessStatus: 204, // Respond to preflight requests with 204 No Content
}));

app.use(express.json());
app.use('/auth', UserRouter)
app.use('/excel',ExcelRouter)
app.use('/data',MyDataRouter)

mongoose.connect(process.env.MONGO_URL).then(async() => {
    console.log("Connected to mongodb");
}).catch((err) => { console.log(err) })

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Started...`);
})

