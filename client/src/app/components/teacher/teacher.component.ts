import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  public quizzes: any
  public results: any

  constructor(public _router: Router, public _ss: ServiceService, public _data: DataService) { }

  ngOnInit() {
    this.getQuizzes()
    this.getResults()
    this._data.currentQuizzes.subscribe(data => this.quizzes = data)
    this._data.currentResults.subscribe(data => this.results = data)
  }

  public getQuizzes() {
    this._ss.getQuizzes().subscribe(
      res => {
        console.log(res)
        this._data.changeQuizzes(res)
      },
      err => console.log(err)
    )
  }

  public getResults() {
    this._ss.getResults().subscribe(
      res => {
        console.log(res)
        this._data.changeResults(res)
      },
      err => console.log(err)
    )
  }

  public handleCopy(link) {
    console.log(link)
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (link));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  public ontype(request, input: string) {
    console.log(input)
    console.log(request)
    if (input === "findQuiz") {
      if (request === "") {
        this.getQuizzes()
      } else {
        let filtered = this.quizzes.filter(q => q.quiz_name.toLowerCase().includes(request.toLowerCase()));
        console.log(filtered)
        this._data.changeQuizzes(filtered)
      }
    }
    else if (input === "searchByUser") {
      if (request === "") {
        this.getResults()
      } else {
        let filtered = this.results.filter(r => r.user.toLowerCase().includes(request.toLowerCase()));
        console.log(filtered)
        this._data.changeResults(filtered)
      }
    }
    else if (input === "searchByQuiz") {
      if (request === "") {
        this.getResults()
      } else {
        let filtered = this.results.filter(r => r.quiz_name.toLowerCase().includes(request.toLowerCase()));
        console.log(filtered)
        this._data.changeResults(filtered)
      }
    }
  }

  public handleShowDetails(num: number) {
    sessionStorage.id = num
    this._router.navigateByUrl("/result")
    /* window.open("/result", "_blank"); */
  }

  public handleClick() {
    this._router.navigateByUrl("/add")
  }

}
