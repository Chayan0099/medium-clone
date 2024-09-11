import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
    Variables:{
        prisma: any
    }
}>(); 

userRoute.use('/*', async (c, next)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    c.set("prisma", prisma); 
    next(); 
})

userRoute.post('/signup', async (c) => {
    const prisma = c.get('prisma'); 
    const body = await c.req.json(); 
    const user = await prisma.user.create({
        name: body.name,
        email: body.email,
        password: body.password
    })

    return c.json({id: user.id})
})

userRoute.post('/signin', async (c) => {
    const prisma = c.get('prisma'); 
    const body = await c.req.json(); 
    const user = await prisma.user.findOne({
        where: {
            email: body.email,
            password: body.password
        }
    })
    return c.json({id: user.id})
})

userRoute.get('/:id', async (c) => {
    const prisma = c.get('prisma'); 
    const id = c.req.param('id'); 

    const blog = await prisma.blog.findOne({
        where: {
            id: id
        }
    })

    return c.json({
        blog: blog
    })
})

userRoute.get('/bulk', async (c) => {
    const prisma = c.get('prisma'); 

    const blogs = prisma.blog.findMany({});
    
    return c.json({blogs: blogs})
}) 

export default userRoute; 