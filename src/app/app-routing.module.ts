import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRootComponent } from './app-root/app-root.component';

const routes: Routes = [
  {
    path: '', component: AppRootComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
