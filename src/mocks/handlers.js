import { rest } from "msw";

export const handlers = [
    rest.get("http://localhost:3000/", (req, res, ctx) => {
        return res.status(201)
    }),
    
    rest.post("/user/login", (req, res, ctx) => {
        return res(ctx.status(200), 
        ctx.json({
            "accessToken": "1234",
            "refreshToken": "123456"
        })
        );
    }),
    
    rest.get("/user", (req, res, ctx) => {
        return res(ctx.status(200))
    }),

    rest.post("user/signup", (req, res, ctx) => {
        return res(ctx.status(200))
    }),

    rest.post('/user/refresh', (req,res,ctx) => {
        return res(ctx.status(201)),
        ctx.json({
            "accessToken": "1234",
            "refreshToken": "123455"
        })
    })
    ];