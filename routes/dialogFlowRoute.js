import {Router} from 'express';
import DialogFlowController from '../controllers/dialogFlowController.js';

const dialogFlowRoute = new Router();
const controller = new DialogFlowController();

dialogFlowRoute.post('/', controller.processar);

export default dialogFlowRoute;