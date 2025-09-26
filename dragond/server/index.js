const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

function rollStats() {
    let stat = 0;
    let statRolls = [];
    while (statRolls.length < 4) {
        statRolls.push(Math.floor(Math.random() * 6) + 1);
    }
    statRolls.sort((a, b) => b - a);
    statRolls.pop();
    for (let i = 0; i < statRolls.length; i++) {
        stat += statRolls[i];
    }
    return stat;
}

app.use(
    cors({
        origin: ['http://localhost:5173'],
    })
);

app.get('/', (req, res) => {
    res.send('Welcome to Node Server');
});

app.get('/api/hello', (req, res) => {
    res.json({message: 'Hello from API'});
});

app.get('/api/stats', (req, res) => {
    let statList = [];
    while (statList.length < 6) {
        statList.push(rollStats());
    }
    res.json({stats: statList});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

