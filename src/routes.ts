import { Router } from 'express';
import settingsController from './controllers/SettingsController';
import usersController from './controllers/UsersController';


const routes =  Router();

routes.post("/api/v1/settings", settingsController.create);
routes.post("/api/v1/users", usersController.create);


routes.get("/api/v1/settings", settingsController.index);


export { routes };      