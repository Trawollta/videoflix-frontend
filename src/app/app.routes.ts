import { Routes } from '@angular/router';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { ForgottPasswordComponent } from './forgott-password/forgott-password.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ResettPasswordComponent } from './resett-password/resett-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgott-password', component: ForgottPasswordComponent },
  { path: 'imprint', component: ImpressumComponent },
  { path: 'privacy', component: PrivacyComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'video/:id', component: VideoDetailComponent }, // Diese Route sollte auf der Hauptebene sein
  { path: 'reset-password-confirm/:uidb64/:token', component: ResettPasswordComponent },
  { path: 'confirm-email/:uidb64/:token', component: ActivateUserComponent },

];

export class AppRoutingModule { }
