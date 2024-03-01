import {agent as supertest} from "supertest";
import {app} from "../src/settings";
import {STATUS_CODE} from "../src/constant-status-code";


const  req = supertest(app)

describe('/users',()=>{

 /*   beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')
    })*/


    let idNewUser:string

    //let incorrectBlogId='63189b06003380064c4193be'

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


   /* it(' POST   create  newPost  for exits Blog)', async ()=> {
        const res =await req
            .post(`/blogs/${idNewBlog}/posts`)
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ title: 'title',
                shortDescription: 'shortDescription',
                content:'content' })
            .expect(STATUS_CODE.CREATED_201)

        const createdPost = res.body
        //console.log(createdPost)
        expect(createdPost.title).toEqual('title')

    })*/

/*    it('Get posts for correct  blog',async ()=>{
        const res = await req
            .get(`/blogs/${idNewBlog}/posts`)
            .expect(STATUS_CODE.SUCCESS_200)

        expect(res.body).toEqual({ pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] })

    })*/


/*    it('Get posts for incorrect  blog',async ()=>{
        const res = await req
            .get(`/blogs/${incorrectBlogId}/posts`)
            .expect(STATUS_CODE.NOT_FOUND_404)

    })


    it(' POST   create  newPost  for exits Blog)', async ()=> {
        const res =await req
            .post(`/blogs/${idNewBlog}/posts`)
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ title: 'title',
                shortDescription: 'shortDescription',
                content:'content' })
            .expect(STATUS_CODE.CREATED_201)

const createdPost = res.body
        //console.log(createdPost)
        expect(createdPost.title).toEqual('title')

    })


    it('Get posts for correct  blog',async ()=>{
        const res = await req
            .get(`/blogs/${idNewBlog}/posts`)
            .expect(STATUS_CODE.SUCCESS_200)
    })*/



})