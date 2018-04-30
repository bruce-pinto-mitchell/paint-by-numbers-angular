import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from '../../feature/welcome/welcome.component';
import { AutoProcessComponent } from '../../feature/auto-process/auto-process.component';
import { ManualProcessComponent } from '../../feature/manual-process/manual-process.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'auto-process',
    component: AutoProcessComponent,
  },
  {
    path: 'manual-process',
    component: ManualProcessComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
