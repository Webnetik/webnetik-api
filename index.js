require('dotenv').config();
const app = require('express')();
const http = require('http').Server(app).listen(process.env.API_PORT);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization");
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

const userController = require('./controllers/user');
const roleController = require('./controllers/role');
const courseController = require('./controllers/course');

app.use('/users', userController);
app.use('/roles', roleController);
app.use('/courses', courseController);

module.exports = app;
