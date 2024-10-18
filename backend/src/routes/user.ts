import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign } from "hono/jwt";
import { signupschema, signinschema } from "chayan-medium-clone-common"

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
    await next(); 
})

userRoute.post('/signup', async (c) => {
    const prisma = c.get('prisma'); 
    const body = await c.req.json();
    
    const success = signupschema.safeParse(body); 
    if(!success) {
        return c.text('Wrong input')
    }

    const user = await prisma.user.create({
        data:{
            name: body.name,
            email: body.email,
            password: body.password
        }
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET) 
    return c.json({token: token})
})

userRoute.post('/signin', async (c) => {
    const prisma = c.get('prisma'); 
    const body = await c.req.json(); 

    const success = signinschema.safeParse(body);
    if(!success) {
        return c.text('wrong input')
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({token: token})
}) 

userRoute.get('/getinfo', async (c) => {
    const prisma = c.get('prisma'); 
    const token = c.req.header('authorization'); 
    if(!token){
        return c.text('No token');
    }
    else {
        const response = decode(token);
        const data = response.payload;
        const userInfo = await prisma.user.findUnique({
            where:{
                id:data.id
            }
        })
        return c.json({info:userInfo}); 
    }
})

export default userRoute; 