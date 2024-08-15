import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/login']);
  }

}
