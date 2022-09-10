import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/userServices/questionService/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  questions_id:any;
  questions_title:any;
  question = {
    "quiz": {
      quiz_id:""
    },
    "content": "",
    "option1": "",
    "option2": "",
    "option3": "",
    "option4": "",
    "answer": ""
    }
  constructor(private _activeted:ActivatedRoute,
    private _questionService:QuestionService,private _router:Router) { }

  ngOnInit(): void {
    this.questions_id = this._activeted.snapshot.params['questions_id'];
    this.questions_title = this._activeted.snapshot.params['title'];
    // console.log(this.questions_id);
    this.question.quiz['quiz_id'] = this.questions_id;
  }

  addQuestionSubmit(){
    console.log(this.question);
   if(this.question.content.trim()==''||this.question.content==null ||
   this.question.option1.trim()==''||this.question.option1==null ||
   this.question.option2.trim()==''||this.question.option2==null ||
   this.question.answer.trim()==''||this.question.answer==null){
    Swal.fire('error !!', 'Fill All Data', 'error');
   }else{
    this._questionService.addQuetion(this.question).subscribe((res)=>{
      Swal.fire('Success !!', 'Success Fully Added Add Another One', 'success');
      // this._router.navigate['/quizzes'];
      this.question = {
        "quiz": {
          quiz_id:this.questions_id,
        },
        "content": "",
        "option1": "",
        "option2": "",
        "option3": "",
        "option4": "",
        "answer": ""
        }
    },(error)=>{
      Swal.fire('error !!', 'Server Error', 'error');
    });

   }
  }

}
