import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UserRepository";
import md5 from 'md5';

interface iUsersService {
    name_user: string,
    email: string,
    user: string,
    password: string
}

class UsersService {
    async create({ email, name_user, user, password }: iUsersService) {
        email = email.toLowerCase();
        user = user.toLowerCase();
        password = md5(password);

        const usersRepositoty = getCustomRepository(UsersRepository);

        // verifica se já existe usuário pelo email

        const emailVerify = await usersRepositoty.findOne({
            email
        });

        // verifica se já existe usuário pelo email

        const userVerify = await usersRepositoty.findOne({
            user
        });


        if (emailVerify) {
            throw new Error('Email Já está cadastrado')
        };


        if (userVerify) {
            throw new Error('Usuário Já está cadastrado')
        };


        const users = usersRepositoty.create({
            email,
            name_user,
            user,
            password
        })
        await usersRepositoty.save(users);

        const urlActivateCount = 'http://10.1.1.138/api/v1/activateaccount/' + md5(users.id);
        console.log(urlActivateCount);
        return users;
    }


    async findByEmail(email: string) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            email,
        });
        return user;
    }
    async activateAccount(user: String) {
        const usersRepository = getCustomRepository(UsersRepository);

        // precisamos verificar se este id de usuário criptografado existe em nossa vase de dados.
        const verifyId = await usersRepository.createQueryBuilder("users")
            .select("id", "id")
            .where('md5(users.user) = :user', { user: user })
            .getRawOne();

        if (!verifyId) {
            throw new Error('token inválid');
        }

        const verifyActive = await usersRepository.createQueryBuilder("users")
            .select("id", "id")
            .where({
                id: verifyId.id,
                is_active: false
            })
            .getRawOne();

        if (!verifyActive) {
            throw new Error('User is already active');
        }

        let userUpdate = await usersRepository.findOne({
            id: verifyActive.id
        })

        userUpdate.is_active = true;
        await usersRepository.save(userUpdate);

        console.log(userUpdate);

        return verifyId;
    }

    async profille(id: string) {
        // 
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne({
            id
        })
        delete user.password;

        return user;
    }

}


export { UsersService }