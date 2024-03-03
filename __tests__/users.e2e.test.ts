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
    let idNewUser2:string


    const loginPasswordBasic64='YWRtaW46cXdlcnR5'

    it('POST create newUsers',async ()=>{

        const res2=await req
            .post('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ login: 'log123',
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

        expect(res1.body.login).toEqual('log111')
        expect(res1.body.email).toEqual('pavelPavel@mail.ru')
        expect(res1.body.id).toEqual(idNewUser1)


    })



    it('get users',async ()=>{
        const res = await req
            .get('/users')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.SUCCESS_200)

        //console.log(res.body.items)

            expect(res.body.items[0].id).toEqual(idNewUser1)
            expect(res.body.items[1].id).toEqual(idNewUser2)
            expect(res.body.items[0].login).toEqual('log111')
            expect(res.body.items[1].login).toEqual('log123')
    })




    // query params(sortBy,sortDirection,pageNumber,pageSize,searchLoginTerm,searchEmailTerm)

    it('get users-- query params sortDirection DESC',async ()=>{
        const res = await req
            .get('/users?sortBy=login&sortDirection=desc')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.SUCCESS_200)

        //console.log(res.body.items)

        expect(res.body.items[0].login).toEqual( 'log123' )
        expect(res.body.items[1].login).toEqual( 'log111' )

    })


    it('get users-- query params sortDirection ASC',async ()=>{
        const res = await req
            .get('/users?sortBy=login&sortDirection=asc')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.SUCCESS_200)

        //console.log(res.body.items)

        expect(res.body.items[0].login).toEqual( 'log111' )
        expect(res.body.items[1].login).toEqual( 'log123' )

    })


    it('get users-- query params searchLoginTerm',async ()=>{
        const res = await req
            .get('/users?searchLoginTerm=og1')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.SUCCESS_200)

        //console.log(res.body.items)

        expect(res.body.items.length).toEqual( 2 )

    })

    it('get users-- query params searchLoginTerm',async ()=>{
        const res = await req
            .get('/users?searchLoginTerm=og12')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(STATUS_CODE.SUCCESS_200)

        //console.log(res.body.items)

        expect(res.body.items.length).toEqual( 1 )

    })


})