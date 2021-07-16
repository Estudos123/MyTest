import { Router } from 'express';
import usersController from '../controllers/UsersController'
import { routes } from '../routes';
import { authMiddleware} from '../midlewares/auth';



const usersRouter = Router();
usersRouter.post('/', usersController.create);
usersRouter.post('/activateaccount/:user', usersController.activateAccount );
usersRouter.get('/profile/', authMiddleware, usersController.profille);





export { usersRouter };