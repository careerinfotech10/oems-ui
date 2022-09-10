import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/userServices/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category: any =
    {
      title: '',
      description: ''
    }

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  categorySubmit() {
    if (this.category.title.trim() == "" || this.category.title.trim() == null &&
      this.category.description.trim() == "" || this.category.description.trim() == null) {
      this._snack.open('Title Required !!', '', { duration: 3000, verticalPosition: "top" });
      Swal.fire('error !!', 'Fill All Data Required !!', 'error');
    } else {
      this._category.addCategory(this.category).subscribe((data) => {
        Swal.fire('Success !!', 'Category is added successfuly', 'success');
        this.category.title = '';
        this.category.description = '';
      }, (error) => {
        Swal.fire('error !!', 'Server Error', 'error');
      },
      );
    }

    // add all

  }

}
