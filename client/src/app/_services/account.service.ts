import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5251/api/';

  login(model: any) {

    return this.http.post(this.baseUrl + 'account/login', model);

  }


}
