import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/userServices/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
category:any = []
  constructor(private catService:CategoryService) { }

  ngOnInit(): void {
    this.catService.catagory().subscribe((data:any)=>{
      this.category = data;
      // console.log(this.category);
    },(error)=>{
      console.log(error);
      Swal.fire('Error !!','Error In Loding Data','error');
    })
  }

}
