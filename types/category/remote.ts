import { AllCategory, CreateCategory, OneCategory, UpdateCategoryRequest } from './client';

export interface AllCategoryResponse {
  data: AllCategory[];
}

export interface OneCategoryResponse {
  data: OneCategory[];
}

export interface CreateCategoryResponse {
  data: CreateCategory;
}

export interface UpdateCategoryResponse {
  data: UpdateCategoryRequest;
}

export interface UpdateCategoryBodyResponse {
  data: UpdateCategoryBodyResponse;
}

export interface DeleteCategoryResponse {
  data: AllCategory;
}
