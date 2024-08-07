import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
  animations: [
    trigger('fadeAnimation', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible => invisible', [
        animate('1s')
      ])
    ])
  ]
})
export class SplashScreenComponent implements OnInit {
  fadeState = 'visible';

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.fadeState = 'invisible';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000); // Wartezeit, bis die Seite wechselt (muss mit der Animationszeit übereinstimmen)
    }, 2000); // Zeit, bis die Animation startet
  }
}