import cors from "cors";
import express, { Application, Request, Response } from "express";
import { userRoutes } from "./app/user/user.route";
import { collegeRoutes } from "./app/college/college.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://collegefinder19.netlify.app"
    ],
    credentials: true
}));

app.use("/api/v1/", userRoutes);
app.use("/api/v1", collegeRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("College finder API is running successfully!");
});

export default app;