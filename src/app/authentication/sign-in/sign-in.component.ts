import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(false)
  });

  loginError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    if (this.signInForm.valid) {
      const credentials = {
        email: this.signInForm.value.email as string,
        password: this.signInForm.value.password as string
      };
      try {
        const response: any = await this.authService.login(credentials).toPromise();
        localStorage.setItem('authToken', response.token);
        this.authService.isLoggedIn();
        this.router.navigateByUrl('/home');
      } catch (error) {
        this.loginError = true;
      }
    }
  }
}
