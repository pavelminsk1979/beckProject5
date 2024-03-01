import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {STATUS_CODE} from "../src/constant-status-code";


const  req = supertest(app)

describe('/users',()=>{

    beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')
    })


    let idNewUser:string


    const loginPasswordBasic64='YWRtaW46cXdlcnR5'

    it('POST create newUsers',async ()=>{
        const res =await req
            .post('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ login: '3333996',
                password: '9999953',
                email:'pavelPavel@mail.ru'})
            .expect(STATUS_CODE.CREATED_201)

        idNewUser=res.body.id

        expect(res.body.login).toEqual('3333996')
        expect(res.body.email).toEqual('pavelPavel@mail.ru')
        expect(res.body.id).toEqual(idNewUser)
    })


})