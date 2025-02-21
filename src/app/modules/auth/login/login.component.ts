import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (token) => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Invalid credentials');
      }
    );
  }
}
