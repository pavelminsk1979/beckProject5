import {Response, Router} from "express";
import {RequestWithBody} from "../allTypes/RequestWithBody";
import {CreateUserModel} from "../allTypes/userTypes";
import {authMiddleware} from "../middlewares/authMiddleware/authMiddleware";
import {loginValidationUsers} from "../middlewares/usersMiddlewares/loginValidationUsers";
import {passwordValidationUsers} from "../middlewares/usersMiddlewares/passwordValidationUsers";
import {emailValidationUsers} from "../middlewares/usersMiddlewares/emailValidationUsers";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";
import {usersService} from "../domain/users-service";


export const usersRoute = Router({})

const postValidationUsers = () => [loginValidationUsers, passwordValidationUsers, emailValidationUsers]


usersRoute.get('/', (req: any, res: any) => {

})


usersRoute.post('/', authMiddleware, postValidationUsers(), errorValidationBlogs, async (req: RequestWithBody<CreateUserModel>, res: Response) => {
    const newUser = await usersService.createUser(req.body)

})


usersRoute.delete('/:id', (req: any, res: any) => {

})