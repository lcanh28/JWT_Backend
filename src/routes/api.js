import express from 'express';
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';

const router = express.Router();

const initApiWebRoutes = (app) => {
    router.post('/register', apiController.handleRegister);

    return app.use('/api/', router);
};

export default initApiWebRoutes;
