import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public result: any
  public isReady: boolean = false
  public counter: number = 0
  public isComment: boolean = false
  public question_id: number = null

  constructor(public _data: DataService, public _ss: ServiceService, public _router: Router) { }

  ngOnInit() {
    this.getResultDetails(sessionStorage.id)
  }

  public getResultDetails(id){
    this._ss.getResultById(id).subscribe(
      res => {
        console.log(res)
        this.result = res
        console.log(this.result)
        console.log(this.result[0])
        console.log(this.result[0].quiz_name)
        this.isReady = true
      },
      err => console.log(err)
    )
  }
  public showComment(id){
    this.question_id = id
    this.isComment = true
  }

  public handleBack() {
    this._router.navigateByUrl("/teacher")
  }
}
