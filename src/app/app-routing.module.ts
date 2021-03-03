import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinningComponent } from './components/binning/binning.component';
import { ChiSquareTestComponent } from './components/chi-square-test/chi-square-test.component';
import { CuboidComponent } from './components/cuboid/cuboid.component';
import { Pagenotfound404Component } from './components/pagenotfound404/pagenotfound404.component';

const routes: Routes = [
  { path: '', component: CuboidComponent },
  { path: 'cuboid', component: CuboidComponent },
  { path: 'chisquare', component: ChiSquareTestComponent },
  { path: 'binning', component: BinningComponent },
  { path: 'pagenotfound', component: Pagenotfound404Component },
  { path: '**', redirectTo: '/pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
