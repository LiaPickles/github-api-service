import { Request, Response, NextFunction } from "express";
import { searchRepositories, searchRepositoryDetails } from "./model";



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

  const getRepositoryDetails = (req: Request, res: Response, next: NextFunction) => {

    const repoId = req.query.id as string;
    const searchTerm = req.body.searchTerm;

    if (!repoId) {
        return res.status(400).send({ message: "Query parameter 'id' is required" });
      }
    
      if (!searchTerm) {
        return res.status(400).send({ message: "Missing search term field" });
      }

    searchRepositoryDetails(searchTerm, repoId)
    .then((formattedRepo) => {
        return res.status(200).send({ formattedRepo })
    })
    .catch((err) => {
        next(err)
    })
    

  }





export { getRepositories, getRepositoryDetails };