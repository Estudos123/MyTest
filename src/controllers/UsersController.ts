import e, { Request, Response } from 'express';
import { passwordValidator } from '../functions/passwordValidator';
import { UsersService } from '../services/UsersService';
import * as yup from 'yup';

interface IrequestUser extends Request {
    userId: string
};

class UserController {
    async create(request: Request, response: Response) {
        try {
            const { email, name_user, user, password } = request.body;

            let schema = yup.object().shape({
                name_user: yup.string().required(),
                email: yup.string().email().required(),
                user: yup.string().required(),
            });

            const isValid = await schema.isValid({
                email, name_user, user
            });


            if (!passwordValidator(password) || !isValid) {
                return response.status(400).json({
                    errors: 'Validation failed'
                });
            }


            const usersService = new UsersService();
            const users = await usersService.create({
                email,
                name_user,
                user,
                password
            })
            return response.status(201).json(users);
        } catch (err) {
            return response.status(500).json({
                error: err.message
            })
        }

    }


    async activateAccount(request: Request, response: Response) {
        try {
            const { user } = request.params;
            const usersService = new UsersService();
            await usersService.activateAccount(user);
            return response.status(201).json({
                message: 'Account Activated Successfully'
            })

        } catch (err) {
            return response.status(400).json({
                error: err.message
            })
        }
    }


    async profille(request: IrequestUser, response: Response) {

        try {
            const usersService = new UsersService();

            const user = await usersService.profille(String(request.userId));

            return response.status(200).json(user);
        } catch (err) {
            return response.status(401).json({
                error: err.message
            })
        }

    }

}

export default new UserController();