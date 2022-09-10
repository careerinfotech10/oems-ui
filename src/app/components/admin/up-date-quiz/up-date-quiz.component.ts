import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/userServices/category/category.service';
import { QuizService } from 'src/app/userServices/quizService/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-up-date-quiz',
  templateUrl: './up-date-quiz.component.html',
  styleUrls: ['./up-date-quiz.component.css']
})
export class UpDateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, 
    private _quizService:QuizService, 
    private categorySer:CategoryService,
    private _router:Router) { }
quiz_Id:any = 0;
category: any = []
quizData:any;
  ngOnInit(): void {
   this.quiz_Id = this._route.snapshot.params['quiz_id'];
   this._quizService.getQuiz(this.quiz_Id).subscribe((res)=>{
     this.quizData = res;
    //  console.log(this.quizData);
   },(error)=>{
    Swal.fire('error !!', 'Server Error', 'error');
   });

   this.categorySer.catagory().subscribe((data: any) => {
    this.category = data;

    // console.log(data)
  }, (error) => {
    console.log(error);
    Swal.fire('error !!', 'Server Error', 'error');
  });
  }

  updateQuizSubmit(){
    this._quizService.updateQuiz(this.quizData).subscribe((res)=>{
      Swal.fire('Success !!', 'Success fully Update', 'success').then((e)=>{
        this._router.navigate(['/admin/quizzes'])
      });
    },(error)=>{
      Swal.fire('error !!', 'Server Error', 'error');
    });
  }

}
