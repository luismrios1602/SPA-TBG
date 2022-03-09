import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { SelectionComponent } from './pages/selection/selection.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'selection',
    component:SelectionComponent
  },
  {
    path: 'loading',
    component:LoadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
