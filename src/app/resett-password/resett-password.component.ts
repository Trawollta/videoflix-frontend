import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-resett-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resett-password.component.html',
  styleUrls: ['./resett-password.component.scss']
})
export class ResettPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';
  uid: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uid = params['uidb64'];
      this.token = params['token'];
    });
  }

  async onSubmit() {
    if (this.resetPasswordForm.valid) {
      const passwords = this.resetPasswordForm.value;
      if (passwords.password1 !== passwords.password2) {
        this.errorMessage = 'Die Passwörter stimmen nicht überein.';
        return;
      }
      try {
        await this.authService.resetPassword(this.uid, this.token, passwords.password1).toPromise();
        this.successMessage = 'Ihr Passwort wurde erfolgreich zurückgesetzt.';
        this.errorMessage = null;
        this.router.navigate(['/login']);
      } catch (error) {
        this.successMessage = null;
        this.errorMessage = 'Fehler beim Zurücksetzen des Passworts. Bitte versuchen Sie es erneut.';
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}
