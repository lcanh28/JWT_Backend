import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
// import connection from './config/connectData'

require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//check connect data
// connection();

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log('>>> JWT Backend is running on the port = ' + PORT);
});
