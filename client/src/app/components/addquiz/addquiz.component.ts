import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']
})
export class AddquizComponent implements OnInit {
  public form: FormGroup
  public counter: number = 0;
  public final: Array<any> = []
  public name: string = null
  public quiz_name: string = null
  public isUniqueName: boolean = false
  public id: number = null
  public correct_answer: number = null
  public show_errors: boolean = false

  constructor(public _fb: FormBuilder, public _ss: ServiceService, public _router: Router) { }

  ngOnInit() {
    //form for login:
    this.form = this._fb.group({
      question: ["", Validators.required],
      option1: ["", Validators.required],
      option2: ["", Validators.required],
      option3: ["", Validators.required],
      option4: ["", Validators.required]
    })
  }

  public handleSelect(value) {
    console.log(value, 'ID')
    this.correct_answer = value
  }
  public handleAdd() {
    this.show_errors = false
    this.show_errors = true
    let quizzes: any
    //check if the name aviable
    this._ss.getQuizzes().subscribe(
      res => {
        quizzes = res
        console.log(quizzes)
        let filtered = quizzes.filter(q => q.quiz_name.toLowerCase().includes(this.name.toLowerCase()));
        console.log(filtered)
        if (filtered.length == 0) {
          this.isUniqueName = true
          console.log(this.isUniqueName)
        } else {
          this.isUniqueName = false
          console.log(this.isUniqueName)
        }
      },
      err => console.log(err)
    )
    if (this.form.controls.question.errors === null &&
      this.form.controls.option1.errors === null &&
      this.form.controls.option2.errors === null &&
      this.form.controls.option3.errors === null &&
      this.form.controls.option4.errors === null &&
      this.name !== null && this.correct_answer !== null && this.isUniqueName === true
    ) {
      this.counter++
      let tmp: Object = this.form.value
      tmp["correct"] = this.correct_answer
      console.log(tmp)
      this.final = this.final.concat(tmp)
      console.log(this.final)
      this.quiz_name = this.name
      //clear form
      this.correct_answer = null
      this.show_errors = false
      this.form.reset()
    }
  }
  public questions(id) {
    let q: any;
    let o1: any;
    let o2: any;
    let o3: any;
    let o4: any;
    let c_a: any;
    for (let i = 0; i < this.counter; ++i) {
      q = this.final[i].question
      o1 = this.final[i].option1
      o2 = this.final[i].option2
      o3 = this.final[i].option3
      o4 = this.final[i].option4
      c_a = this.final[i].correct
      console.log(id, q, o1, o2, o3, o4, c_a)
      this._ss.saveQuestions({ id_quiz: id, question: q, opt1: o1, opt2: o2, opt3: o3, opt4: o4, correct: c_a }).subscribe(
        res => {
          console.log(res)
          this.counter = 0
          this.name = null
        },
        err => console.log(err)
      )
    }
  }
  public handleFinish() {
    console.log(this.final)
    //save quiz name and creat link:
    let replacedName: string = this.quiz_name.split(' ').join('-');
    let lowerCaseName: string = replacedName.toLowerCase()
    let url: string = "http://localhost:4200/quiz/" + lowerCaseName
    //url = "http://localhost:4200//quiz/" + this.id
    console.log(url)
    this._ss.saveQuiz({ quiz_name: this.quiz_name, link: url }).subscribe(
      res => {
        console.log(JSON.parse(res))
        let tmp = JSON.parse(res)
        console.log(tmp.insertId)
        this.questions(tmp.insertId)
      },
      err => console.log(err)
    )

  }
  public handleCancel() {
    this._router.navigateByUrl("/teacher")
  }
}
