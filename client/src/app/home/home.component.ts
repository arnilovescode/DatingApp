import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.getUsers();
    
  }
  registerMode = false;
  /**
   *
   */

  http = inject(HttpClient);

  accountService = inject(AccountService);

  Users: any;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  cancelRegister(event :boolean)
  {
    this.registerMode=event;
  }
  getUsers() {
    this.http.get("https://localhost:5251/api/users").subscribe({
      next: (response) => { this.Users = response; },
      error: (error) => { console.log(error); },
      complete: () => { console.log("Request has been completed."); }
    });
  }

 
}
