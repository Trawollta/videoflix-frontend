import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(false)
  });

  loginError: string | null = null;  // Hier können wir spezifische Fehlermeldungen speichern
  registrationSuccessMessage: string | null = null;

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
        } catch (error: any) { // Explizit den Typ `any` für `error` festlegen
            if (error?.status === 403) {
                this.loginError = 'Ihr Konto ist noch nicht aktiviert. Bitte überprüfen Sie Ihre E-Mail.';
            } else {
                this.loginError = 'Anmeldedaten sind falsch. Bitte versuchen Sie es erneut.';
            }
        }
    }
}


  checkRegistrationMessage() {
    const message = localStorage.getItem('registrationSuccessMessage');
    if (message) {
      this.registrationSuccessMessage = message;
      localStorage.removeItem('registrationSuccessMessage');
    }
  }

  ngOnInit() {
    this.checkRegistrationMessage();
  }
}
