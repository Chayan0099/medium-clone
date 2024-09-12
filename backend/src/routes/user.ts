import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
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

    const token = sign({id: user.id}, c.env.JWT_SECRET)

    return c.json({token: token})
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

    const token = sign({id: user.id}, c.env.JWT_SECRET)
 
    return c.json({token: token})
}) 

export default userRoute; 