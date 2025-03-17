import axios from "axios";

const githubApi = axios.create({
    baseURL: "https://api.github.com",
  });

  const searchRepositories = (searchTerm: string) => {
    return githubApi
      .get("/search/repositories", { params: { q: searchTerm } })
      .then((res) => {
        return {
          total_count: res.data.total_count,
          repositories: res.data.items.map((repo: any) => ({
            name: repo.name,
            owner: repo.owner.login,
            url: repo.html_url,
          })),
        };
      });
  };

  const searchRepositoryDetails = (searchTerm: string, repoId: string) => {
    return githubApi
    .get("/search/repositories", { params: { q: searchTerm }})
    .then((res) => {

        if (!res.data.items || res.data.items.length === 0) {
            return [];
        }
        
        const repoDetails = res.data.items.find((repo: any) => repo.id.toString() === repoId);

        if (repoDetails) {
            const formattedRepo = {
                id: repoDetails.id,
                name: repoDetails.name,
                description: repoDetails.description,
                owner: repoDetails.owner.login,
                forks_count: repoDetails.forks_count,
                open_issues_count: repoDetails.open_issues_count,
                watchers_count: repoDetails.watchers_count,
                language: repoDetails.language,
                html_url: repoDetails.html_url,
            };
            return formattedRepo
        }
        else{
            return  Promise.reject({
                status: 404,
                message: "Id not found",
            })
        }
    
    })
}

  
  
  export { searchRepositories, searchRepositoryDetails };
