import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreatedUserSchema, CreateRoomSchema, SigninSchema } from "@repo/common/common";
import { prisma } from "@repo/db/client";



const app = express()
app.use(express.json())





app.post("/signup", async (req, res) => {
    const parsedData = CreatedUserSchema.safeParse(req.body)



    if (!parsedData.success) {
        return res.json({
            message: "Incorrect data"
        })
    }

    try {

        await prisma.user.create({
            data: {
                email: parsedData.data.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }

        })
        console.log("error happened");

        res.json({
            message: "User signed up"
        })


    } catch (error) {
        res.status(411).json({
            message: "user already exists with this username ",


        })
    }


})



app.post("/signin", (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET)


    res.json({
        token
    })
})


app.post("/room", middleware, (req, res) => {

    const data = CreatedUserSchema.safeParse(req.body)


    res.json({
        roomId: 123
    })

})



app.listen(3001)






