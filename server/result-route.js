const router = require('express').Router()
const mysql = require('mysql')

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
    console.log("result-route connected to mysql")
})

//get all results (short version)
router.get("/", async (req, res) => {
    try {
        let b = await Query(`SELECT 
        date, quiz_name, user, quantity_q, quantity_a, id_result
    FROM
        result_details
    INNER JOIN results 
        ON result_details.id_result = results.id
    INNER JOIN quiz.quizzes 
        ON results.id_quiz = quizzes.id;`)
        res.json(b)
    } catch (err) {
        res.send(500, "oops...")
        throw err
    }
})
//get result by quiz id
router.get("/:id", async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM result_details
    INNER JOIN results 
        ON result_details.id_result = results.id
    INNER JOIN quizzes 
        ON results.id_quiz = quizzes.id 
    WHERE id_result = ?`, [req.params.id])
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})
//save result without details
router.post("/", async (req, res) => {
    try {
        let { id_quiz, user, quantity_q, quantity_a } = req.body
        let q = `INSERT INTO results ( id_quiz, user, quantity_q, quantity_a)
          VALUES (?, ?, ?, ?)`
        let b = await Query(q, id_quiz, user, quantity_q, quantity_a)
        res.json(b)
    } catch (err) {
        throw err
    }
})
//save result details
router.post("/details", async (req, res) => {
    try {
        let { id_question, id_result, choosed, correct, isCorrect } = req.body
        let q = `INSERT INTO result_details ( id_question, id_result, choosed, correct, isCorrect)
          VALUES (?, ?, ?, ?, ?)` //don't need "" for string
        let b = await Query(q, id_question, id_result, choosed, correct, isCorrect)
        res.sendStatus(200) //ok
    } catch (err) {
        throw err
    }
})

function Query(q, ...p) {
    return new Promise((resolve, reject) => {
        db.query(q, p, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = router;
