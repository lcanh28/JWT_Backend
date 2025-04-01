import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiWebRoutes from './routes/api';
import configCors from './config/cors';
// import connection from './config/connectData'
import cookieParser from 'cookie-parser';

require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;

//config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser())

//check connect data
// connection();

//init web routes
initWebRoutes(app);
initApiWebRoutes(app);

app.use((req, res) => {
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log('>>> JWT Backend is running on the port = ' + PORT);
});
