import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseMessage } from 'src/model/apiResponse/apiresponsemessage';
import { userOrderModel } from 'src/model/order/getuserorder';

@Injectable({
  providedIn: 'root',
})
export class orderService {
  private apiUrl = 'https://localhost:44348/api/';

  constructor(private http: HttpClient) {}

  public getMenuById(
    id: string
  ): Observable<ApiResponseMessage<userOrderModel>> {
    const param = new HttpParams().append('id', id);
    return this.http.get<ApiResponseMessage<userOrderModel>>(
      this.apiUrl + `Canteen/GetUserOrder`,
      { params: param }
    );
  }
}
