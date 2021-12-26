import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/_models/category.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  currentCategory:Category={
    category_name: '',
    target_sales: 0,
    current_sales:0,
    percentage:0
    };
    message='';

  constructor(private categoryService:CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getCategory(this.route.snapshot.params.id);
  }
  getCategory(id: string): void {
    this.categoryService.get(id)
      .subscribe(
        data => {
          this.currentCategory = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  updatecategory(): void {
    this.message = '';

    this.categoryService.update(this.currentCategory.id, this.currentCategory)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This category was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteCategory(): void {
    this.categoryService.delete(this.currentCategory.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/categories']);
        },
        error => {
          console.log(error);
        });
  }
}
