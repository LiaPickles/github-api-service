import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { getRepositories } from "./controller";

const app = express();
app.use(cors());
app.use(express.json());


  app.get("/repositories", (req: Request, res: Response, next: NextFunction) => {
    getRepositories(req, res, next);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.message) {
      res.status(err.status).send({ message: err.message });
    } else {
      next(err);
    }
  });

  app.all("*", (req: Request, res: Response) => {
    res.status(404).send({ message: "Route not found" });
  });
  
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: "Internal Server Error" });
  });
  



export default app; 