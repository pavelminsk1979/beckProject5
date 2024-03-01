import { usersCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {userMaper} from "../../mapers/userMaper";
import {OutputUser, PaginationWithOutputUser, QueryUsersInputModal} from "../../allTypes/userTypes";
import {queryParamsValidationUsers} from "../../middlewares/usersMiddlewares/queryParamsValidationUsers";


export const userQueryRepository = {

    async findUserById(id: string):Promise<OutputUser|null> {
        const user = await usersCollection.findOne({_id: new ObjectId(id)})
        if (!user) return null

            return userMaper(user)
    },


    async getUsers(queryParams:QueryUsersInputModal):Promise<PaginationWithOutputUser<OutputUser>>{

       const {pageNumber,pageSize,sortBy,sortDirection,searchLoginTerm,searchEmailTerm}=queryParamsValidationUsers(queryParams)

        let filter = {}
        if (searchLoginTerm) {
            filter = {
                login: {
                    $regex: searchLoginTerm,
                    $options: 'i'
                }
            }
        }
        if (searchEmailTerm) {
            filter = {
                ...filter,
                email: {
                    $regex: searchEmailTerm,
                    $options: 'i',
                },
            };
        }


        const users = await usersCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const totalCount = await usersCollection.countDocuments(filter)

        const pagesCount = Math.ceil(totalCount / pageSize)

        return {
            pagesCount,
            page: pageNumber,
            pageSize,
            totalCount,
            items: users.map(userMaper)
        }
    },




}