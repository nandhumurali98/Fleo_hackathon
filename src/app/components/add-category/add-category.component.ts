import { CategoryService } from './../../services/category.service';
import { Component } from '@angular/core';
import { Category } from 'src/app/_models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent{

  category:Category={
  category_name: '',
  target_sales: 0,
  current_sales:0,
  percentage:0
  };
  submitted = false;

  constructor(private categoryService:CategoryService) { }

  savecategory(): void {
    const data = {
      category_name: this.category.category_name,
      target_sales:this.category.target_sales,
      current_sales: this.category.current_sales,
      percentage:this.category.percentage
    };

    this.categoryService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newcategory(): void {
    this.submitted = false;
    this.category = {
      category_name: '',
      target_sales:0,
      current_sales:0,
      percentage:0
    };
  }
}
