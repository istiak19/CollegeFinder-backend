import cors from "cors";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./app/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        "http://localhost:5173",
    ],
    credentials: true
}));

app.use("/api/v1/", userRoutes);
// app.use("/api", borrowRoute);

app.get("/", (req: Request, res: Response) => {
    res.send("College finder API is running successfully!");
});

export default app;