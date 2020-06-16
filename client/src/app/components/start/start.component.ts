import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
 
  constructor(public _data: DataService) { }
  @Input() quiz:any

  ngOnInit() {
  }

  public handleEnter(value) {
    console.log(value)
    this._data.changeUser(value)
  }
}
