import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories?: Category[];
  currentcategory: Category = {};
  currentIndex = -1;
  title = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.categoryService.getAll()
      .subscribe(
        data => {
          this.categories = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveCategories();
    this.currentcategory = {};
    this.currentIndex = -1;
  }

  setActivecategory(category: Category, index: number): void {
    this.currentcategory = category;
    this.currentIndex = index;
  }

  removeAllcategories(): void {
    this.categoryService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }
}
