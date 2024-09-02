import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-user',
  standalone: true,
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {
  activationMessage: string = ''; 

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['uidb64'];
      const token = params['token'];

      this.authService.activateAccount(userId, token).subscribe(
        response => {
          this.activationMessage = 'Aktivierung erfolgreich!';
          setTimeout(() => {
            this.router.navigate(['/login']); 
          }, 3000);
        },
        error => {
          this.activationMessage = 'Aktivierung fehlgeschlagen. Bitte versuchen Sie es erneut.'; 
          console.error('Aktivierung fehlgeschlagen:', error);
        }
      );
    });
  }
}
