import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  declarations: [LoginComponent],
  providers: [AuthService],
})
export class AuthModule {}
