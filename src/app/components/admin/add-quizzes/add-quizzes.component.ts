import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/userServices/category/category.service';
import { QuizService } from 'src/app/userServices/quizService/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {
  category: any = []
  addQuizzes: any = {
    title: "",
    description: "",
    maxMarks: "",
    numberOfQuestions: "",
    active: true,
    category: {
      category_id: ""
    }
  }

  constructor(private categorySer: CategoryService,
    private _snack: MatSnackBar, private _addQuiz: QuizService) { }

  ngOnInit(): void {
    this.categorySer.catagory().subscribe((data: any) => {
      this.category = data;

      console.log(data)
    }, (error) => {
      console.log(error);
      Swal.fire('error !!', 'Server Error', 'error');
    });
  }
  quizSubmit() {
    console.log(this.addQuizzes);

    if (this.addQuizzes.title.trim() == '' || this.addQuizzes.title.trim() == null &&
      this.addQuizzes.description.trim() == '' || this.addQuizzes.description.trim() == null &&
      this.addQuizzes.numberOfQuestions.trim() == '' || this.addQuizzes.numberOfQuestions.trim() == '' &&
      this.addQuizzes.maxMarks.trim() == '' || this.addQuizzes.maxMarks.trim() == '') {

      this._snack.open('Title is required !!', '', {
        duration: 3000,
        verticalPosition: "top"
      });
    }
    this._addQuiz.addQuiz(this.addQuizzes)
      .subscribe((data) => {
        Swal.fire('Success !!', 'Category is added successfuly', 'success');
        this.addQuizzes = {
          title: "",
          description: "",
          maxMarks: "",
          numberOfQuestions: "",
          active: true,
          category: {
            category_id: ""
          }
        }
      }, (error) => {
        Swal.fire('error !!', 'Server Error', 'error');
      }
      );
  }

}
