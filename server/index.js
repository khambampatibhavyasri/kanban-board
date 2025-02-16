const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const initDB = require('./helpers/initDB');
const user_routes = require('./routes/userRoutes')


const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
initDB();


app.get('/', (req, res)=>{
    res.send('Hello')
})

app.use('/api/', user_routes);

app.listen(5000, ()=>{
    console.log('running')
})