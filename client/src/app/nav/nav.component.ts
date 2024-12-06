import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,  BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  accountService = inject(AccountService);
  model: any = {};
  // loggedIn = false;

  login() {
    this.accountService.login(this.model).subscribe(
      {
        next: response => {
          console.log(response);
          //this.loggedIn = true;
        },
        error: error => console.log(error)
      });

    //this.accountService.login(this.model);


  }

  logout() {
    //this.loggedIn = false;
    this.accountService.logout();
    console.log(this.model);
  }
}


