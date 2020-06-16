import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public user = new BehaviorSubject<string>(null)
  currentUser = this.user.asObservable();
  changeUser(name: string) {
    console.log("User updated!")
    this.user.next(name)
  }

/*   public details = new BehaviorSubject<number>(null)
  currentDetails = this.details.asObservable();
  changeDetails(num: number) {
    console.log("Details updated!")
    this.details.next(num)
  } */

  public quizzes = new BehaviorSubject<Array<any>>([])
  currentQuizzes = this.quizzes
  changeQuizzes(data) {
    console.log("Quizzes updated!")
    this.quizzes.next(data)
  }

  public results = new BehaviorSubject<Array<any>>([])
  currentResults = this.results
  changeResults(data) {
    console.log("Results updated!")
    this.results.next(data)
  }
}
