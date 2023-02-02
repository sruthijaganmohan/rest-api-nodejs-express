// HTTP - post

const express = require('express')
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

// get
app.get('/', (req, res)=>{
    res.send('hello world!');
});

app.get('/api/courses', (req, res)=>{
    res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('course with given ID not found')
    }
    res.send(course)
});

// post
app.post('/api/courses', (req, res)=>{
    // input validation
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
        res.status(400).send(result.error)
    }
    // if (!req.body.name || req.body.name.lenght < 3){
    //     400 bad request
    //     res.status(400).send('name is required (min 3 characters')
    //     return;
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`listening on port ${port}`));