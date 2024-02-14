const express = require('express')
const app = express()
const port = process.env.port || 10000;

app.use(express.json());

const courses = [
  {id:1 , name:'course1'},
  {id:2, name:'course2'},
  {id:3, name:'course3'}
]


app.get('/', (req, res) => {
  res.send('Hello nodemon')
})

app.get('/api/courses',(req,res) =>{

  res.send(courses);
})

app.post('/api/courses',(req,res) =>{
  if(!req.body.name || req.body.name.length <3){

    res.status(400).send('Name is required or should be minimum 3 characters long');
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})