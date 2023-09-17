const express = require('express');
const os = require('os');

const app = express();
const fs = require('fs');

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
// app.get('/api/test', (req, res) => fetch('../client/estimatedTime.json').then((json) => res.send(json)));
app.get('/api/test2', (req, res) => {
    console.log(__dirname)
    const file = fs.readFileSync(__dirname + "/../client/estimatedTime.json");
    // for windows, use below inst of line 12: 
    // const file = fs.readFileSync(__dirname + "\\\..\\\client\\\estimatedTime.json");
    
    
    
    console.log(JSON.parse(file));
    res.send(JSON.parse(file));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
