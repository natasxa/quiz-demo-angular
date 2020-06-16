const express = require('express')
const cors = require('cors')
const downloadRoute = require('./download-route')
const quizRoute = require('./quiz-route')
const resultRoute = require('./result-route')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/download/', express.static('download'));
app.use(cors())
app.use (express.json())
app.use("/filedownload", downloadRoute)
app.use("/quiz", quizRoute)
app.use("/result", resultRoute)

app.listen(1000, () => console.log("rockin'1000")) 