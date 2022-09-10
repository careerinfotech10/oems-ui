import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/userServices/questionService/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrls: ['./startquiz.component.css']
})
export class StartquizComponent implements OnInit {
  
  quiz_id: any;
  isSubmit = false;
  question: any;
  
  timer: any;
  marksGot: any = 0;
   correctAnswers = 0;
   attempted = 0;
   
   // MatPaginator Inputs
   length :any;
   pageSize :any;
   pageSizeOptions: number[] = [0];
   // MatPaginator Output

   pageEvent: PageEvent | undefined;
   
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  constructor(private locationSt: LocationStrategy,
    private _route: ActivatedRoute, private questionService: QuestionService) { }
  ngOnInit(): void {
    this.preventBackButton();
    this.quiz_id = this._route.snapshot.params['quez_id'];
    console.log(this.quiz_id);
    this.questionService.getQuetionOfQuizForTest(this.quiz_id).subscribe((res) => {
      this.question = res;
      this.timer = this.question.length * 2 * 60;
      // this.question.forEach((q: any) => {
      //   q['givenAnswer'] = '';
      // });
      console.log(this.question);
      this.length = this.question.length;
      this.pageEvent = this.question;
      this.startTimer();
    }, (error) => {
      Swal.fire('Error', 'Server Fail to lode', 'error');
    })
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do You Want To Submit The Quiz',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `Don't save`,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.directSubmit();
      }
    });


  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.directSubmit();
        clearInterval(t)
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormatedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm}:${ss}`;
  }

  directSubmit() {
    // call to server check questions

    this.questionService.directQuiz(this.question).subscribe((res:any)=>{
      console.log(res);
      this.attempted = res.attempted;
      this.correctAnswers= res.correctAnswers;
      this.marksGot = parseFloat(Number(res.marksGot).toFixed(2));
      this.isSubmit = true
    },(error)=>{
      console.log(error);
    })
    // this.question.forEach((question: any) => {
    //   if (question.givenAnswer == question.answer) {
    //     this.correctAnswers++;
    //     let markSingle = this.question[0].quiz.maxMarks / this.question.length;
    //     this.marksGot += markSingle;
    //   }
    //   this.isSubmit = true
    //   if (question.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // console.log('Carrect Answer' + this.correctAnswers)
    // console.log('Marks Got' + this.marksGot)
    // console.log('Attempt:- ' + this.attempted)
    // console.log(this.question)
   
  }


  printPage(){
    window.print()
  }

}
