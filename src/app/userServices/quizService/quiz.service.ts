import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }
  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  // add quiz
  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

   // delete quiz
   public deleteQuiz(quiz_id:any){
    return this.http.delete(`${baseUrl}/quiz/${quiz_id}`);
  }

  // get the single quiz
  public getQuiz(quiz_id:any){
    return this.http.get(`${baseUrl}/quiz/${quiz_id}`)
  }

  // update quiz
  public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  // get quizzes of category
  public getQuizzesOfCategory(category_id:any){
   return this.http.get(`${baseUrl}/quiz/category/${category_id}`)
  }

  // get active quizzes

  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  
  // get active quizzes Of Category
  public getActiveQuizzesOfCategory(category_id:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${category_id}`);
  }
}
