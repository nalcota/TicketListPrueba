import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule  // ✅ forChild() aquí
  ]
})
export class AuthModule {}
