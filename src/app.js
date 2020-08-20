const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);

});

app.post("/repositories",  (request, response) => {
  const {title, url, techs} = request.body;
  
  
  const results = {
                      id: uuid(), 
                      title, 
                      url, 
                      techs,  
                      likes: 0
                    };

  repositories.push(results);

  return response.json(results);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const resultsIndex = repositories.findIndex(results => results.id == id);
  if(resultsIndex == -1){
    return response.status(400).json({error: 'Tente de novo'});
  }
  const resultss = repositories[resultsIndex];


    const updateProject = {
        ...resultss,
        title,
        url,
        techs,
    };

      repositories[resultsIndex] = updateProject; 
      return response.json(updateProject);

});

app.delete("/repositories/:id", (request, response) => {
  const{id} = request.params;

  const results = repositories.findIndex(results => results.id ==id);
  if(results == -1){
    return response.status(400).json({error: 'Tente de novo'});
  }

  repositories.splice(results, 1);
  return response.status(204).send();

});


app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const resultsIndex = repositories.findIndex(results => results.id ==id);
  if(resultsIndex == -1) {
    return response.status(400).send();
}

  const resultss = repositories[resultsIndex];
yarn 
  const updateProject = {
    ... resultss,
      likes: results.likes + 1,
  }

  repositories[resultsIndex] = updateProject;

  return response.json(updateProject);
});

module.exports = app;

