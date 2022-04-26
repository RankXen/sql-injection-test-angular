import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  content?: string;

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.content = this.tokenStorage.getFromSession("pizzaPlace")!;      
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    console.log('Username: ' + username);
    console.log('password: ' + password);
    
    this.authService.login(username, password).subscribe(token => {
     
      console.log(token);
      this.tokenStorage.saveToken(token.token);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.userService.getPizza(token.token).subscribe(place => {
        this.tokenStorage.saveInSession("pizzaPlace", place.pizzaPlace);
        console.log(place);
        this.reloadPage();
        this.content = this.tokenStorage.getFromSession("pizzaPlace")!;
        this.router.navigate(['/user']);
      });
    },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }

    )
    //     console.log('pizzaPlace: '+pizzaPlace););
    // this.authService.login(username, password).subscribe(
    //   data => {
    //     console.log('data: '+data);
    //     const pizzaPlace = this.userService.getPizza(data);
    //     console.log('pizzaPlace: '+pizzaPlace);
    //     this.tokenStorage.saveToken(data);
    //     //this.tokenStorage.saveUser(data);
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     // this.roles = this.tokenStorage.getUser().roles;
    //     // this.reloadPage();
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // );
  }
  reloadPage(): void {
    window.location.reload();
  }
}