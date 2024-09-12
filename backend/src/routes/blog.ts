import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
    Variables: {
        prisma: any
    }
}>(); 

blogRoute.use('/*', async (c, next) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    c.set("prisma", prisma); 
    next(); 
})

blogRoute.post('/createBlog', async (c) => {
    const prisma = c.get('prisma'); 
    const body = await c.req.json(); 

    const blog = await prisma.blog.create({
        title: body.title,
        content: body.content
    })

    return c.json({id: blog.id}); 
})

blogRoute.put('/:id', async (c) => {
    const prisma = c.get('prisma'); 
    const id = c.req.param('id'); 
    const body = await c.req.json(); 
    const blog = await  prisma.blog.updateOne({
        where:{
            id: id
        } ,
        data:{
            title: body.title,
            content: body.content
        } 
    })

    return c.text('Blog updated successfully')
})

blogRoute.get('/:id', async (c) => {
    const prisma = c.get('prisma'); 
    const id = c.req.param('id'); 
    
    const blog = await prisma.blog.findOne({
        where: {
            id: id
        }
    })

    return c.json({blog: blog}); 
})

blogRoute.get('/bulk', async (c) => {
    const prisma = c.get('prisma'); 
    const blogs = await prisma.blog.findMany({}); 

    return c.json({blogs: blogs}); 
})

export default blogRoute; 