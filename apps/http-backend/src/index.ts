import express, { json } from "express";
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



app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Invalid Input"
        })
        return
    }

    const user = await prisma.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if (!user) {
        res.json({
            message: "NOt authorized"
        })
        return;
    }
    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET)

    res.json({
        token
    })

})


app.post("/room", middleware, async (req, res) => {

    const parsedData = CreateRoomSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }
    //@ts-ignore
    const userId = req.userId


    try {

        const createdRoom = await prisma.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })
        res.json({
            roomId: createdRoom.id
        })
    } catch (error) {
        res.json({
            message: "room already exists"
        })
    }




})



app.listen(3001)






