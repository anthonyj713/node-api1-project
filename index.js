const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [
    {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Joe Exotic", // String, required
    bio: "Tiger King" // String, required
    },
    {
    id: shortid.generate(),
    name: "Carole Baskin",
    bio: "May or may not have covered her husband in sardine oil and fed them to tigers"
    },
    {
    id: shortid.generate(),
    name: "Doc Antle",
    bio: "Cult leader with multiple wives and multiple tigers"
    }
];

//middleware
server.use(express.json()); //teaches the server to parse JSON from the body


// let userId = users.length;

//endpoints

server.get('/', (req, res) => {
    res.json({ api: 'running....'});
});

server.get('/api/users', (req, res) => {
     if(users){
         res.json(users);
     } else {
         res.status(500).json({ errorMessage: 'The users information could not be retrieved'})
     }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);

    if(user){
    res.status(200).json(user);
    } else {
    res.status(404).json({ message: 'User not found'})
    }
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
 
    users.push(userInfo);
    if(userInfo){
    res.status(201).json(users);
    } else {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
    }
});

server.delete('api/users/:id', (req, res) => {
    const id = req.params.id;

    users = users.filter(user => user.id != id)
    res.status(200).json(users);
})

const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));

