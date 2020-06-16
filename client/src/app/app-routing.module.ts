import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddquizComponent } from './components/addquiz/addquiz.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { StartComponent } from './components/start/start.component';
import { ResultComponent } from './components/result/result.component';


const routes: Routes = [
  { path: 'add', component: AddquizComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'start', component: StartComponent },
  { path: 'result', component: ResultComponent },
  { path: 'quiz/:id', component: QuizComponent/* , children: [{ path: 'quiz/:id', component: UserDetailComponent }] */},
  { path: '', pathMatch: "full", redirectTo: 'teacher' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
