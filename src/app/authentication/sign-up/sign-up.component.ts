import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password1: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl<string>('', [Validators.required])
  });

  registrationSuccess = false;
  signUpError = false; 

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    if (this.signUpForm.valid) {
      const userData = {
        email: this.signUpForm.value.email as string,
        password1: this.signUpForm.value.password1 as string,
        password2: this.signUpForm.value.password2 as string,
      };
      try {
        await this.authService.register(userData).toPromise();
        this.registrationSuccess = true;
        this.router.navigateByUrl('/login');
      } catch (error) {
        console.error('Registrierung fehlgeschlagen:', error);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}
