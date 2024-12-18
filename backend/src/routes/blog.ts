import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { createblogschema, updateblogschema } from "chayan-medium-clone-common";

const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
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
  
    const token = c.req.header("authorization"); 
    const success = verify(token || "", c.env.JWT_SECRET); 
    if (!success) {
        return c.text("wrong credentials"); 
    }
    await next(); 
})

blogRoute.post('/createBlog', async (c) => {
    const prisma = c.get('prisma'); 
    const body = await c.req.json(); 

    const success = createblogschema.safeParse(body); 
    if(!success) {
        return c.text("Wrong input")
    }

    const token = c.req.header("authorization"); 
    const decoded = decode(token || "")

    const blog = await prisma.blog.create({
       data: { title: body.title,
        content: body.content,
        authorId: decoded.payload.id }
    })

    if(blog.id) {
        return c.json({id:blog.id});
    }
    else {
        return c.json({msg:"Can't publish blog"})
    }
})

blogRoute.put('/:id', async (c) => {
    const prisma = c.get('prisma'); 
    const id = c.req.param('id'); 
    const body = await c.req.json();
    
    const success = updateblogschema.safeParse(body);
    if(!success) {
        return c.text('wrong input')
    }   

    const blog = await  prisma.blog.update({
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

blogRoute.get('/bulk', async (c) => {
    const prisma = c.get('prisma'); 
    const blogs = await prisma.blog.findMany({}); 

    return c.json({blogs: blogs}); 
})

blogRoute.get('/myblogs', async(c) => {
    const prisma = c.get('prisma');
    const token = c.req.header('authorization');
    if(token){
        const id = decode(token);
        const blogs = await prisma.blog.findMany({
            where:{
                authorId: id.payload.id
            }
        })
        return c.json({blogs:blogs}); 
    }
    else {
        return c.text('No token');
    }

})

blogRoute.get('/:id', async (c) => {
    const prisma = c.get('prisma'); 
    const id = c.req.param('id'); 
    
    const blog = await prisma.blog.findUnique({
        where: {
            id: id
        }
    })

    return c.json({blog: blog}); 
})

export default blogRoute; 