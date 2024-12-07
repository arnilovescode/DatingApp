import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, signal } from '@angular/core';
import { User } from '../_interfaces/User';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5251/api/';

  currentUser = signal<User | null>(null);

  login(model: any) {

    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if (!user)
          return;
        //console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);

      })
    );
  }


  register(model: any) {

    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (!user)
          return;
        //console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);

  }


}


