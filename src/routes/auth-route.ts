import {Response, Router} from "express";
import {RequestWithBody} from "../allTypes/RequestWithBody";
import {CreateUserModel, OutputUser,} from "../allTypes/userTypes";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";
import {usersService} from "../servisces/users-service";
import {STATUS_CODE} from "../constant-status-code";
import {loginAndEmailValidationAuth} from "../middlewares/authMiddleware/loginAndEmailValidationAuth";
import {passwordValidationAuth} from "../middlewares/authMiddleware/passwordValidationAuth";



export const authRoute = Router({})

const postValidationAuth = () => [loginAndEmailValidationAuth, passwordValidationAuth]


authRoute.post('/login', postValidationAuth(), errorValidationBlogs, async (req: RequestWithBody<CreateUserModel>, res: Response): Promise<OutputUser | null> => {

    const newUser = await usersService.createUser(req.body)

    if (newUser) {
        res.status(STATUS_CODE.CREATED_201).send(newUser)

    } else {
        res.sendStatus(STATUS_CODE.BAD_REQUEST_400)
    }
    return null;

})


/*usersRoute.get('/', authMiddleware,async(req: RequestWithQuery<QueryUsersInputModal>, res: Response):Promise<Response<PaginationWithOutputUser<OutputUser>>> => {

const users = await userQueryRepository.getUsers(req.query)

    return res.status(STATUS_CODE.SUCCESS_200).send(users)

})*/





