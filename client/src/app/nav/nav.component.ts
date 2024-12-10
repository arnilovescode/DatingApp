import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};
  // loggedIn = false;

  login() {
    this.accountService.login(this.model).subscribe(
      {
        next: _ => {
          this.router.navigateByUrl('/members');
          //this.loggedIn = true;
        },
        error: error => this.toastr.error(error.error)
      });

    //this.accountService.login(this.model);


  }

  logout() {
    //this.loggedIn = false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}


