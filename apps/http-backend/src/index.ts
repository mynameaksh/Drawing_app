import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreatedUserSchema, CreateRoomSchema, SigninSchema } from "@repo/common/common";



const app = express()
app.use()





app.post("/signup", (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body)
    if (!data.success) {
        return res.json({
            message: "Incorrect data"
        })
    }

    res.json({
        userId: 123
    })
})



app.post("/signup", (req, res) => {
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