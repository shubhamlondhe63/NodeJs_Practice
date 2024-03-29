// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaptopListComponent } from './laptop-list/laptop-list.component';
import { LaptopFormComponent } from './laptop-form/laptop-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/laptops', pathMatch: 'full' },
  { path: 'laptops', component: LaptopListComponent },
  { path: 'laptops/add', component: LaptopFormComponent },
  { path: 'laptops/edit/:id', component: LaptopFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
