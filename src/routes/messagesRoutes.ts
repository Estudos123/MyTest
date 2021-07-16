import { Router } from 'express';
import messagesController from '../controllers/MessagesController'
import { routes } from '../routes';

const messagesRouter = Router();

messagesRouter.post('/', messagesController.create);
messagesRouter.get('/:user_id', messagesController.listByUser);



export { messagesRouter };