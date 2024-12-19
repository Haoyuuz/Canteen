import { Injectable } from '@angular/core';

Injectable({
  providedIn: 'root',
});
export interface ApiResponseMessage<T> {
  data: any;
  isSuccess: boolean;
  errorMessage: string;
}
