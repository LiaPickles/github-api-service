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
  
  
  export { searchRepositories };
