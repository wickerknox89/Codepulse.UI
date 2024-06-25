import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  categories$?: Observable<Category[]>;

  constructor(private categoryService: CategoryService){}
  
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onSearch(query: string) {
    this.categories$ = this.categoryService.getAllCategories(query);
  }
}

