import { Router } from 'express';
import sessionController from '../controllers/SessionController'
import { routes } from '../routes';
const sessionRouter = Router();
sessionRouter.post('/', sessionController.store);



export { sessionRouter };