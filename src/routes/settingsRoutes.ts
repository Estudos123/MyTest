import { Router } from 'express';
import settingsController from '../controllers/SettingsController'
import { routes } from '../routes';

const settingsRouter = Router();

settingsRouter.post('/', settingsController.create);
settingsRouter.get('/',settingsController.index )


export { settingsRouter };