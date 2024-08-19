import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { AbstractControl } from '@angular/forms';

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
    password2: new FormControl<string>('', [Validators.required]),
    termsAccepted: new FormControl<boolean>(false, [Validators.requiredTrue])
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password1');
    const confirmPassword = control.get('password2');
    if (password?.value !== confirmPassword?.value) {
      return { mismatch: true };
    }
    return null;
  }


  registrationSuccess = false;
  signUpError = false;
  successMessage = '';

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
        this.successMessage = 'Eine Bestätigungs-E-Mail wurde an Ihre Adresse gesendet. Bitte überprüfen Sie Ihren Posteingang.';
        this.registrationSuccess = true;
  
        // Verzögertes Weiterleiten zum Login
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 5000); // Weiterleitung nach 5 Sekunden
      } catch (error: any) {
        if (error.error && error.error.error === 'Diese E-Mail-Adresse ist bereits vergeben.') {
          this.signUpForm.get('email')?.setErrors({ emailTaken: true });
        } else {
          this.signUpError = true;
          console.error('Registrierung fehlgeschlagen:', error);
        }
      }
    }
  }
  

  goBack(): void {
    this.router.navigate(['/login']);
  }
}
