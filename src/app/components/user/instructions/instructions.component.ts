import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/userServices/quizService/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
quiz_id:any;
quiz:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private _roter:Router) { }

  ngOnInit(): void {
    this.quiz_id = this._route.snapshot.params['question_id'];
    console.log(this.quiz_id);
    this._quiz.getQuiz(this.quiz_id).subscribe((res:any)=>{
      // console.log(res);
      this.quiz = res;
      console.log(this.quiz);
      
    },(error)=>{
      // console.log(error);
      Swal.fire('Error','Error In Loading Quiz Data');
    })
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._roter.navigate(['startquiz/'+this.quiz_id])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
