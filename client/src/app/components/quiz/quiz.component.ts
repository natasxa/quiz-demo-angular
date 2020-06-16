import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public user: string = null
  public quiz: any
  public questions: any

  public url: string = null
  public link: string = null
  public counter: number = 0
  public total: number // total amount of questions
  public activeQuestion: any
  public finish: boolean = false
  public result: boolean = false
  public answer: number = null
  public answerArr: Array<any> = []
  public quantityOfRightAnswers: any

  constructor(public _router: Router, public _data: DataService, public _ss: ServiceService) { }

  ngOnInit() {
    this.url = this._router.url
    this.link = "http://localhost:4200" + this._router.url
    console.log(this.url)
    console.log(this.link)
    this._data.currentUser.subscribe(data => this.user = data)
    this.getQuiz()
  }

  public getQuiz() {
    this._ss.getQuizzes().subscribe(
      res => {
        console.log(res)
        let quizzes: any = res
        let filtered = quizzes.filter(q => q.link === this.link)
        this.quiz = filtered[0]
        this._ss.getQuestionsByQuizId(this.quiz.id).subscribe(
          res => {
            console.log(res)
            this.questions = res
            this.activeQuestion = this.questions[this.counter]
            console.log(this.questions.length)
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }
  public handleAnswer(id) {
    console.log(id, "choosed")
    this.answer = id
  }
  public checkAnswer() {
    console.log(this.questions[this.counter])
    console.log(this.activeQuestion)
    let tmp: Object = {}
    tmp["id_question"] = this.questions[this.counter].id
    tmp["correct"] = this.questions[this.counter].correct
    tmp["choosed"] = +this.answer
    console.log(tmp)
    this.answerArr = this.answerArr.concat(tmp)
    this.nextQuestion()
  }
  public nextQuestion() {
    this.answer = null
    this.counter++
    if ((this.counter + 1) === this.questions.length) {
      this.finish = true
    } else {
      this.activeQuestion = this.questions[this.counter]
    }
  }
  public handleNext() {
    this.checkAnswer()
  }
  public handleFinish() {
    this.checkAnswer()
    this.result = true
    console.log(this.answerArr)
    this.quantityOfRightAnswers = this.answerArr.filter(a => a.correct === a.choosed)
    console.log(this.quantityOfRightAnswers.length, 'QUANTITY OF RIGHT ANSWERS')
    this.saveResult()
  }
  public saveResult() {
    this._ss.saveResult({ id_quiz: this.quiz.id, user: this.user, quantity_q: this.questions.length, quantity_a: this.quantityOfRightAnswers.length }).subscribe(
      res => {
        console.log(res)
        let tmp = JSON.parse(res)
        this.saveDetails(tmp.insertId)
      },
      err => console.log(err)
    )
  }
  public saveDetails(id_result) {
    for (let i = 0; i < this.questions.length; ++i) {
      this._ss.saveDetails({ id_question: this.questions[i].id, id_result: id_result, choosed: this.answerArr[i].choosed, correct: this.answerArr[i].correct, isCorrect: this.answerArr[i].choosed === this.answerArr[i].correct }).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }
  }
}
