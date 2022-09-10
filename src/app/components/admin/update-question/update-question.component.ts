import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/userServices/questionService/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  question_id:any;
  question_title:any;
  quiz_title:any
  question:any = {
    "quiz": {
      "quiz_id":"",
    },
    "content": "",
    "option1": "",
    "option2": "",
    "option3": "",
    "option4": "",
    "answer": ""
    }
  constructor(private _route:ActivatedRoute, private questionService:QuestionService) { }

  ngOnInit(): void {
    this.question_id = this._route.snapshot.params['questions_id'];
    this.quiz_title = this._route.snapshot.params['title'];
    // alert(this.quiz_title);
    this.questionService.getQuetion(this.question_id).subscribe((res)=>{
      this.question = res;
      // console.log(this.question);
    },(error)=>{
      Swal.fire('Error','Intanull Server Error','error');
    })
  }

  updateQuestionSubmit(){
    console.log(this.question);
    this.questionService.updateQuetion(this.question).subscribe((res)=>{
      Swal.fire('Success','Success Fully Update','success');
    },(error)=>{
      Swal.fire('Error','Intanull Server Error','error');
    })
  }

}
