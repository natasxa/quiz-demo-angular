import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http: HttpClient) { }

  /************************************QUIZ**********************************/
  public getQuizzes() {
    return this.http.get('http://localhost:1000/quiz')
  }  
 /*  public getQuizById(id) {
    return this.http.get('http://localhost:1000/quiz/' + id)
  } */
 /*  public checkId() {
    return this.http.get('http://localhost:1000/quiz/check')
  }  */ 
  public saveQuiz(body) {
    return this.http.post('http://localhost:1000/quiz', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })
  }
  public getQuestionsByQuizId(id) {
    return this.http.get('http://localhost:1000/quiz/questions/' + id)
  }
  public saveQuestions(body) {
    return this.http.post('http://localhost:1000/quiz/questions', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })
  }
  /************************************RESULTS**********************************/
  public getResults() {
    return this.http.get('http://localhost:1000/result')
  } 
  public getResultById(id_result) {
    return this.http.get('http://localhost:1000/result/' + id_result)
  }
  public saveResult(body) {
    return this.http.post('http://localhost:1000/result', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })
  }  
  public saveDetails(body) {
    return this.http.post('http://localhost:1000/result/details', body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    })
  }
/*   public downloadResult(name) {
    return this.http.get('http://localhost:1000/download/' + name,
      { headers: { 'Content-Type': 'application/json', 'token': sessionStorage.token }, responseType: "blob" })
  }*/
} 
