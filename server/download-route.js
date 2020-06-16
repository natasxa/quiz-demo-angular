const router = require('express').Router()
const mysql = require('mysql')
const path = require('path')
const table = require('table').table;
const fs = require('fs')
const formidable = require('formidable')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "quiz"
});

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("download-route connected to mysql")
})

router.post('/', async (req, res) => {   
    //prepearing to rename file:
    let b = await Query(`SELECT * FROM results`)
    console.log(b.length, 'LENGTH')
    let filename = 'result_' + b.length + '.txt'
    //prepearing content:
    console.log(req.body, 'BODY')
    let items = req.body
    console.log(items.length, 'LENGTH OF RESULTS')
    let data = []   
    data.push(["Result: " + "smth from req.body"])
    let output = table(data);
    //save result to folder:
    fs.writeFile(__dirname + "/results/" + filename, output, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.end();
})

router.get('/:name', (req, res) => {   
    filePath = path.join(__dirname + "/results/" + req.params.name)
    console.log(filePath)
    res.sendFile(filePath)
})

function Query(q, ...par) {
    return new Promise((resolve, reject) => {
        db.query(q, par, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = router;
