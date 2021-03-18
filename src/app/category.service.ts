import { Injectable } from '@angular/core';
import categoryJson from '../assets/category.json';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}
  ngOnInit() {}

  getAll() {
    return categoryJson;
  }
}
