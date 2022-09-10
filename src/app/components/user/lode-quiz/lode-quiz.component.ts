import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/userServices/quizService/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lode-quiz',
  templateUrl: './lode-quiz.component.html',
  styleUrls: ['./lode-quiz.component.css']
})
export class LodeQuizComponent implements OnInit {
  quizzes: any;
  category_id: any;
  constructor(private _route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      // console.log(params);
      this.category_id = params['category_id'];
      if (this.category_id == 0) {
        console.log('loade all quiz');
        this.quizService.getActiveQuizzes().subscribe((res) => {
          this.quizzes = res;
          console.log(this.quizzes);
        }, (error) => {
          Swal.fire('Error', 'Server', 'error');
        });
      } else {
        // console.log('loade specific quiz');
        this.quizService.getActiveQuizzesOfCategory(this.category_id).subscribe((res: any) => {
          this.quizzes = res;
        }, (error) => {
          Swal.fire('Error', 'Server', 'error');
        })
      }
    })

  }

}
