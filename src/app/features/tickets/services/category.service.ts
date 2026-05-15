import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoryListResponse, SubcategoryListResponse } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseURL = `${environment.backendUrl}/category`;

  getCategories(): Observable<CategoryListResponse> {
    return this.http.get<CategoryListResponse>(`${this.baseURL}/categories`);
  }

  getSubcategories(): Observable<SubcategoryListResponse> {
    return this.http.get<SubcategoryListResponse>(`${this.baseURL}/subcategories`);
  }

  getSubcategoriesByCategory(category: string): Observable<SubcategoryListResponse> {
    return this.http.get<SubcategoryListResponse>(`${this.baseURL}/subcategories/${category}`);
  }
}
