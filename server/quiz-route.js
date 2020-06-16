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
    console.log("quiz-route connected to mysql")
})
//get all quizzes
router.get("/", async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM quizzes`)
        res.json(b)
    } catch (err) {
        res.send(500, "oops...")
        throw err
    }
})
/* //get quiz by url 
router.get("/:url", async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM quizzes WHERE link = ?`, [req.params.url])
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})  */
/* //get last quiz id
router.get("/check", async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM quizzes WHERE id = (SELECT MAX(id) FROM quizzes)`)
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
}) */
//create a new quiz
router.post("/", async (req, res) => {
    try {
        let q = await Query(`INSERT INTO quizzes (quiz_name, link) VALUES ('${req.body.quiz_name}', '${req.body.link}')`)
        res.json(q)
    } catch (err) {
        throw err
    }
})
//get questions by quiz id
router.get("/questions/:id", async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM questions WHERE id_quiz = ?`, [req.params.id])
        res.json(b)
    } catch (err) {
        res.send(500, "ooops..")
        throw err
    }
})
//create quiz questions
router.post("/questions", async (req, res) => {
    try {
        let { id_quiz, question, opt1, opt2, opt3, opt4, correct } = req.body
        let q = `INSERT INTO questions ( id_quiz, question, opt1, opt2, opt3, opt4, correct)
          VALUES (?, ?, ?, ?, ?, ?, ?)` //don't need "" for string
        let b = await Query(q, id_quiz, question, opt1, opt2, opt3, opt4, correct)
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
