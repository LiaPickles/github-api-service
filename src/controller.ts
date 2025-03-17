import { Request, Response, NextFunction } from "express";
import { searchRepositories } from "./model";



const getRepositories = (req: Request, res: Response, next: NextFunction) => {
    const searchTerm = req.query.name as string;
  
    if (!searchTerm) {
      return res.status(400).send({ message: "Query parameter 'name' is required" });
    }
  
    searchRepositories(searchTerm)
      .then((repos) => {
        return res.status(200).send({ repos });
      })
      .catch((err) => {
        next(err);
      })
  };





export { getRepositories };