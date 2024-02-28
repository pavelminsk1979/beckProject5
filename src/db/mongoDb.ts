import {MongoClient} from  'mongodb'
import dotenv from 'dotenv'
import {Blog} from "../allTypes/blogTypes";
import {Post} from "../allTypes/postTypes";

export const port = 3000


dotenv.config()


const mongoUri = process.env.MONGO_URL;
if(!mongoUri){
    throw new Error('URL not find(file mongoDb.ts:14')
}

 const client = new MongoClient(mongoUri)

const db=client.db('projectHW')

export const postsCollection=db.collection<Post>('posts')

export const blogsCollection=db.collection<Blog>('blogs')

export async function runDb(){
    try {
        await client.connect()
        console.log('Connected successful with mongoDB')
    }catch (e) {
        console.log(e +'Connected ERROR with mongoDB')
        await client.close()

    }
}