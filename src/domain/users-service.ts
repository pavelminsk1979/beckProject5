import {CreateUserModel} from "../allTypes/userTypes";
import bcrypt from "bcrypt"


export const usersService = {

    async createUser(requestBodyUser: CreateUserModel) {

        const {login, password, email} = requestBodyUser


        const passwordSalt = await bcrypt.genSalt(10)

        const passwordHash = await this._generateHash(password, passwordSalt)




        const newUser = {
            passwordSalt,
            passwordHash,
            login,
            email,
            createdAt: new Date()
        }

        //return usersRepository.createUser(newUser)



    },

    async _generateHash(password: string, passwordSalt: string) {
        const hash = await bcrypt.hash(password, passwordSalt)
        return hash
    },


 /*   async isExistLoginAndHashPasswordInDataBase(login: string, password: string) {
        const user = await userRepository.findByLogin(login)
        if (!user) {
            return false
        }
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        } else {
            return true
        }
    }*/
}