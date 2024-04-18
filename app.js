const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.port || 10000;

app.use(express.json());

const movies = [
  {id:1 , name:'PULP FICTION', year:1994, rank:92},
  {id:2, name:'RESERVOIR DOGS', year:1992, rank:90},
  {id:3, name:'INGLOURIOUS BASTERDS', year:2009, rank:89}
]


app.get('/', (req, res) => {
  res.send('Hello nodemon')
})

app.get('/api/movies',(req,res) =>{

  res.send(movies);
})

app.get('/api/movies/:id',(req,res) =>{

  let movie = movies.find(c => c.id === parseInt(req.params.id))

  if(!movie) res.status(404).send('the movie with the id ' + req.params.id + ' was not found')

  res.send(movie);
})

app.post('/api/movies',(req,res) =>{

  
  const {error} = validateMovie(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }

  const movie = {
    id: movies.length + 1,
    name: req.body.name,
    year: req.body.year,
    rank: req.body.rank
  }
  movies.push(movie);
  res.send(movie);
})

app.put('/api/movies/:id',(req,res) =>{
  let movie = movies.find(c => c.id === parseInt(req.params.id))

  if(!movie) res.status(404).send("the movie with the id was not found")
  
  const {error} = validateMovie(req.body);
if(error){
  res.status(400).send(error.details[0].message);
  return;
}
 movie.name = req.body.name;
 res.send(movie);
});

app.delete('/api/movies/:id',(req,res) =>{

  let movie = movies.find(c => c.id === parseInt(req.params.id));
  
  if(!movie) res.status(404).send("the movie with the id was not found");

  const index =  movies.indexOf(movie);
  movies.splice(index,1);

  res.send(movie);

});

function validateMovie(movie){
  const schema = Joi.object({
    name:Joi.string().min(3).required(),
    year:Joi.number().integer().options({convert:false}),
    rank:Joi.number().integer().options({convert:false})
  });

  return schema.validate(movie);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})