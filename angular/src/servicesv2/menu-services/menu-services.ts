import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseMessage } from 'src/model/apiResponse/apiresponsemessage';
import { createOrEditMenu } from 'src/model/menu/createOrEditMenu';
import { getAllCategory } from 'src/model/menu/getAllCategory';
import { getMenuModel } from 'src/model/menu/getAllOrGetById-menu.model';
import { getMenuItemById } from 'src/model/menu/getItemMenuById';

@Injectable({
  providedIn: 'root',
})
export class menuServices {
  private apiUrl = 'https://localhost:44348/api/';

  constructor(private http: HttpClient) {}

  public getAllOrGetById(
    id: string
  ): Observable<ApiResponseMessage<getMenuModel[]>> {
    const param = new HttpParams().append('id', id);
    return this.http.get<ApiResponseMessage<getMenuModel[]>>(
      this.apiUrl + `Canteen/GetAllOrGetAllById/`,
      { params: param }
    );
  }

  public getAllCategory(): Observable<ApiResponseMessage<getAllCategory[]>> {
    return this.http.get<ApiResponseMessage<getAllCategory[]>>(
      this.apiUrl + `Canteen/GetAllMenuCategory`
    );
  }

  public getMenuById(
    id: string
  ): Observable<ApiResponseMessage<getMenuItemById>> {
    const param = new HttpParams().append('id', id);
    return this.http.get<ApiResponseMessage<getMenuItemById>>(
      this.apiUrl + `Canteen/GetMenuItemById`,
      { params: param }
    );
  }

  public CreateUpdateReqSub(
    formData: FormData
  ): Observable<ApiResponseMessage<createOrEditMenu>> {
    return this.http.post<ApiResponseMessage<createOrEditMenu>>(
      this.apiUrl + 'Canteen/CreateOrEditMenuItems',
      formData
    );
  }
}
