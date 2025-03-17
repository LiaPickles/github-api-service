# GitHub Repository Search API

This is a Node.js service that interacts with the GitHub REST API to allow users to:
✅ Search for repositories by name.
✅ Retrieve detailed information about a specific repository, including forks, open issues, and watchers.

# Tech Stack
* Node.js
* Express.js (for building the API)
* TypeScript (for type safety)
* Axios (for making API requests to GitHub)

# Project Setup
1️⃣ Clone the Repository
git clone https://github.com/LiaPickles/github-api-service
cd github-api-service

2️⃣ Install Dependencies
npm install

3️⃣ Create a .env File
This project uses environment variables to configure the API URL and server port.

Your .env file should contain this:
PORT=3000
GITHUB_API_URL=https://api.github.com

Since this project does not use authentication, you may hit GitHub’s rate limits for unauthenticated requests. If needed, you can generate a GitHub Personal Access Token later and modify the request headers.


4️⃣ Start the Server
npm run dev  # Runs in development mode
npm start    # Runs in production mode
By default, the API will run on http://localhost:3000.


# API Endpoints
1️⃣ Search for GitHub Repositories
Endpoint:
GET /repositories?name={searchQuery}

Example Request:
GET http://localhost:3000/repositories?name=react

Example Response:
{
    "total_count": 1000,
    "repositories": [
        {   "id": 4445
            "name": "react",
            "owner": "facebook",
            "url": "https://github.com/facebook/react"
        },
        {   "id": 7766
            "name": "react-router",
            "owner": "remix-run",
            "url": "https://github.com/remix-run/react-router"
        }
    ]
}

2️⃣ Get Details for a Specific Repository
Endpoint:
POST /repositories?id={repository_id}

Example Request:
POST http://localhost:3000/repositories?id=4567
SEND { searchTerm: "react" }

Example Response:
{
    "id": 420875841,
    "name": "world",
    "description": "A Laravel package which provides a list of countries, states, cities, currencies, timezones, and languages.",
    "owner": "nnjeim",
    "forks_count": 118,
    "open_issues_count": 0,
    "watchers_count": 864,
    "language": "PHP",
    "html_url": "https://github.com/nnjeim/world"
}

While it isn't recommended to use a POST request, I ended up opting for this as there is no endpoint on the github api to search for a repository by ID. Yet as required by the task, I wanted to keep /repositories?id={repository_id} as an endpoint. If more research was carried out and more time was available I would instead store the search term results as an in memory cache, then searching through those to find a repository with the matching ID. 

A POST request here isn't correct as no information is being sent to a database, this was an easier work around for me to provide search term information without including it in the api request. 

This way the client can first search using a search term with the previous endpoint where they will then be given a list of relevant repos and their IDs (and some other info). The user can then use the ID they desire from the first search to perform the search with the second endpoint using the same search term and the ID they now have. 


# Running tests 
npm run test
Make sure you Jest and Supertest installed. 
