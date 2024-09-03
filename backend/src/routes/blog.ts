import { Hono } from "hono";

const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: String
    }
}>(); 

export default blogRoute; 