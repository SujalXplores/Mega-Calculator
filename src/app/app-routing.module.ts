import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BinningComponent } from './components/binning/binning.component';
import { ChiSquareTestComponent } from './components/chi-square-test/chi-square-test.component';
import { CuboidComponent } from './components/cuboid/cuboid.component';
import { AuthguardService } from './components/login/authguard.service';
import { LoginComponent } from './components/login/login.component';
import { Pagenotfound404Component } from './components/pagenotfound404/pagenotfound404.component';
import { RedblackTreeComponent } from './components/redblack-tree/redblack-tree.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'nav',
    canActivate: [AuthguardService],
    component: NavbarComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'cuboid', component: CuboidComponent },
      { path: 'chisquare', component: ChiSquareTestComponent },
      { path: 'binning', component: BinningComponent },
      { path: 'rbtree', component: RedblackTreeComponent }
    ]
  },
  { path: 'pagenotfound', component: Pagenotfound404Component },
  { path: '**', redirectTo: '/pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
