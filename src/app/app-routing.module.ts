import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuboidComponent } from './components/cuboid/cuboid.component';
import { Pagenotfound404Component } from './components/pagenotfound404/pagenotfound404.component';

const routes: Routes = [
  { path: '', component: CuboidComponent },
  { path: 'cuboid', component: CuboidComponent },
  { path: 'pagenotfound', component: Pagenotfound404Component },
  { path: '**', redirectTo: '/pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
