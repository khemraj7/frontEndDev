import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  { path: '', component: HomeComponent }
]


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule

  ]
})
export class HomeModule { }
