const express = require('express')
const app = express()
const port = process.env.port || 10000;

app.use(express.json());

const courses = [
  {id:1 , name:'course1'},
  {id:2, name:'course2'}

]


app.get('/', (req, res) => {
  res.send('Hello nodemon')
})

app.get('/api/courses',(req,res) =>{

    res.send([1,2,3])
})

app.get('/api/courses/:year/:month',(req,res) =>{

  res.send(req.params);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})