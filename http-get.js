// http get method

const express = require('express')
const app = express();


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]


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

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`listening on port ${port}`));