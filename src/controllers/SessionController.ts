import { Request, Response } from 'express'
import * as Yup from 'yup';
import { SessionService } from '../services/SessionService'


class SessionController {

  async store(request: Request, response: Response) {

    try {
      const schema = Yup.object().shape({
        user: Yup.string().required(),
        password: Yup.string().required()
      });

      if (!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: 'Validation fails' });
      }

      const { user, password } = request.body;

      const userServive = new SessionService();

      const login = await userServive.store({
        user,
        password
      })

      return response.status(201).json(login)

    } catch (err) {
      return response.status(401).json(err.message)
      }
    





  }
}

export default new SessionController();