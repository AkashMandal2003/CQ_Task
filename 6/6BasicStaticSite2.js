const express = require('express');
const fs=require("fs");
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/details', (req, res) => {
    const id = req.query.id;

    if (req.url === '/details?id=') {
        res.status(400).send('Specify the value');
    } else if (!id) {
        res.status(400).send('Invalid Request');
    } else {
        res.send(`Request received with value ${id}`);
    }

});

app.get("*",(req,res)=>{
    const f=fs.readFileSync("./public/404.html","utf-8");
    res.send(f);
})

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
