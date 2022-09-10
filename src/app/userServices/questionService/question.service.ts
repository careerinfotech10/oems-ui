import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuetionOfQuiz(question_id:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${question_id}`);
  }

  public getQuetionOfQuizForTest(question_id:any){
    return this._http.get(`${baseUrl}/question/quiz/${question_id}`);
  }

  public addQuetion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }
  public getQuetion(question_id:any){
    return this._http.get(`${baseUrl}/question/${question_id}`);
  }
  // update Question
  public updateQuetion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  // delete Question

  public deleteQustion(question_id:any){
    return  this._http.delete(`${baseUrl}/question/${question_id}`); 
  }

  // /direct-quiz
  public directQuiz(question:any){
    return  this._http.post(`${baseUrl}/question/direct-quiz/`,question);
  }
}
