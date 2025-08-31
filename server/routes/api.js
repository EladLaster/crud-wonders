const express = require('express')
const router = express.Router()

const wonders = [
    { name: "Mount Everest", location: "Nepal", visited: false },
    { name: "Grand Canyon", location: "Arizona", visited: false },
    { name: "Botanical Gardens", location: "Singapore", visited: true },
    { name: "Pantheon", location: "Greece", visited: false },
    { name: "Colosseum", location: "Italy", visited: true }
]

router.get('/wonders', function (req, res) {
    res.send(wonders)
})

router.post('/wonder', function (req, res) {
    console.log("Someone's trying to make a post request")
    wonders.push({ ...req.body, visited: false })
    res.send({ message: "Wonder added!", wonders })
})

router.put('/wonder/:name', function (req , res) {
    console.log("Someone's trying to make a put request");
    const name = decodeURIComponent(req.params.name);
    const wonder = wonders.find(n=>n.name===name);
    if (!wonder) {
        return res.status(404).send({ message: "Wonder not found" });
    }
    wonder.visited = true;
    res.send({ message: "Wonder visited!", wonders })
})

router.delete('/wonder/:name', function (req , res) {
    console.log("Someone's trying to make a delete request");
    const name = decodeURIComponent(req.params.name);
    const index = wonders.findIndex(n => n.name === name);
    if (index === -1) {
        return res.status(404).send({ message: "Wonder not found" });
    }
    wonders.splice(index, 1);
    res.send({ message: "Wonder deleted!", wonders });
})

module.exports = router;
