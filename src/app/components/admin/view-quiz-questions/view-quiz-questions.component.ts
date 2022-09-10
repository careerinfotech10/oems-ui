import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/userServices/questionService/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  quiz_id:any;
  quiz_title:any;
  questions:any =[
    
  ]
  constructor(private _route:ActivatedRoute, private _questionService:QuestionService) { }

  ngOnInit(): void {
     this.quiz_id = this._route.snapshot.params['id'];
     this.quiz_title = this._route.snapshot.params['title'];
     this._questionService.getQuetionOfQuiz(this.quiz_id).subscribe((res:any)=>{
      //  console.log(res)
       this.questions = res;
     },(error)=>{
      Swal.fire('Error !!','Error In Loding Data','error');
     })

  }

  deleteQuestion(question_id:any){
    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._questionService.deleteQustion(question_id).subscribe((res) => {
          this.questions = this.questions.filter((question:any)=>question.question_id != question_id);
          Swal.fire('Success !!', 'Deleted Success Fully', 'success');
        }, (error) => {
          Swal.fire('error !!', 'Server Error', 'error');
        });
      }
    })
  }

}
