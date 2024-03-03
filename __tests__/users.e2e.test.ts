import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {STATUS_CODE} from "../src/constant-status-code";


const  req = supertest(app)

describe('/users',()=>{

    beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')
    })


    let idNewUser1:string
    let idNewLogin:string
    let idNewEmail:string
    let idNewUser2:string


    const loginPasswordBasic64='YWRtaW46cXdlcnR5'

    it('POST create newUsers',async ()=>{

        const res2=await req
            .post('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ login: 'login123',
                password: '11111111',
                email:'pavPav@mail.ru'})

        idNewUser2=res2.body.id

            ////////////////

        const res1 =await req
            .post('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ login: 'log111',
                password: '55555555',
                email:'pavelPavel@mail.ru'})
            .expect(STATUS_CODE.CREATED_201)

        idNewUser1=res1.body.id
        idNewLogin=res1.body.login
        idNewEmail=res1.body.email

        expect(res1.body.login).toEqual(idNewLogin)
        expect(res1.body.email).toEqual(idNewEmail)
        expect(res1.body.id).toEqual(idNewUser1)


    })



    it('get users',async ()=>{
        const res = await req
            .get('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.SUCCESS_200)

        //console.log(res.body.items)

            expect(res.body.items[0].id).toEqual(idNewUser1)
            expect(res.body.items[0].login).toEqual(idNewLogin)
            expect(res.body.items[0].email).toEqual(idNewEmail)

    })


})