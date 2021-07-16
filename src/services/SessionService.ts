import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UserRepository";
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth'


interface IsessionService {
  user: string,
  password: string
}


class SessionService {
  async store({ user, password }: IsessionService) {
    user = user.toLowerCase();

    const usersRespository = getCustomRepository(UsersRepository);

    const userExists = await usersRespository.findOne({
      user
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    const verifyPassword = await usersRespository.findOne({
      user,
      password: md5(password)
    });

    if (!verifyPassword) {
      throw new Error('password does not match');
    }

    const verifyUserActive = await usersRespository.findOne({
      user,
      is_active: true
    });

    if (!verifyUserActive) {
      throw new Error('User Not Activated');
    }


    const { id, name_user, email } = userExists;


    return {
      user: {
        id,
        name_user,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      expiresIn: authConfig.expiresIn
    };
  }
}
export { SessionService }