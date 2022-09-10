import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/userServices/quizService/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any = [
    {
      "quiz_id": 60,
      "title": "HTML",
      "description": "Doctype ",
      "maxMarks": "100",
      "numberOfQuestions": "50",
      "active": true,
      "category": {
        "category_id": 37,
        "title": "programming Qustion",
        "description": "This Quiz Category contains Quizzes Releted To programming Qustion"
      }
    },
    {
      "quiz_id": 38,
      "title": "HTML Basics",
      "description": "This Quiz Category contains Quizzes Releted To HTML Basics",
      "maxMarks": "100",
      "numberOfQuestions": "50",
      "active": false,
      "category": {
        "category_id": 37,
        "title": "programming Qustion",
        "description": "This Quiz Category contains Quizzes Releted To programming Qustion"
      }
    }
  ]
  constructor(private quixService: QuizService) { }

  ngOnInit(): void {
    this.quixService.quizzes().subscribe((res) => {
      this.quizzes = res;
      console.log(this.quizzes);
      
    }, (error) => {
      Swal.fire('error !!', 'Server Error', 'error');
    });
  }

  deleteQuiz(quiz_id: any) {
   

    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.quixService.deleteQuiz(quiz_id).subscribe((res) => {
          this.quizzes = this.quizzes.filter((quiz:any)=>quiz.quiz_id != quiz_id);
          Swal.fire('Success !!', 'Deleted Success Fully', 'success');
        }, (error) => {
          Swal.fire('error !!', 'Server Error', 'error');
        });
      }
    })
  }
}
