import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  menu(){
    this.router.navigate(['home'])
  }

  logOut(){
    this.auth.signOut()
    .then(() => this.router.navigate(['login']))
    .catch(err => console.log(err));
  }
}
