const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
const auth = require('./middleware/auth.js');

require("dotenv").config;
require('./database.js');
const PORT = 3000;

app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/auth', auth)

app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API is runningg :)'
    });
})
app.listen(PORT, () =>{
    console.log(`Server is up and running smooooth on PORT ${PORT}`);
});