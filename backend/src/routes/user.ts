import { PrismaClient } from "@prisma/client/edge";
import { DynamicClientExtensionArgs } from "@prisma/client/runtime/library";
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

export default userRoute; 