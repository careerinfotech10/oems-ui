import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/userServices/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories:any;
  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.catagory().subscribe((res)=>{
      this.categories = res;
      // console.log(this.categories);
    },(error)=>{
      Swal.fire('Error','Error Form Server','error')
    })
  }

}
