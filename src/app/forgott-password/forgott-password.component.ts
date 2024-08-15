import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-forgott-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgott-password.component.html',
  styleUrls: ['./forgott-password.component.scss']
})
export class ForgottPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  });

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email as string;
      try {
        await this.authService.sendPasswordResetLink(email).toPromise();
        this.successMessage = 'Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet.';
        this.errorMessage = null;
      } catch (error) {
        this.successMessage = null;
        this.errorMessage = 'Fehler beim Senden des Links zum Zurücksetzen des Passworts. Bitte versuchen Sie es erneut.';
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}
