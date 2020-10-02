const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const port = process.env.PORT || 8080

app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,x-access-tolen");
    res.setHeader("Access-Control-Allow-Credentials",true);
    next();
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.end("welcome to root path...");
});
app.get("/home", (req, res) => {
    res.end("welcome to home path...");
});
app.post("/api", (req, res) => {
    const username = req.body.username;
    const reference = req.body.reference;
    console.log('U: ' + username + '\nR: ' + reference + '\n----------')
    if ((username === '' || reference === '') || (username === null || reference === null)) {
        res.json({
            res_code: 422,
            msg: 'Error, missing some parameter data.'
        })
    } else{
        res.json({
            res_code: 200,
            username: username,
            reference: reference,
            msg: 'Success'
        })
    }
    
});
app.listen(port)
