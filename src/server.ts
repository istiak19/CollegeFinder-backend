import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
let server: Server;

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB!")
        server = app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
};

main();