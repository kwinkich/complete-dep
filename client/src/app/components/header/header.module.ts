import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShortenAddressModule } from 'app/pipes/short-address.module';
import { LanguageService } from 'app/services/language/language.service';
import { ButtonConnectModule } from '../buttons/button-connect/button-connect.module';
import { ButtonWComponent } from '../buttons/button-w/button-w.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent, ButtonWComponent],
  imports: [CommonModule, ButtonConnectModule, ShortenAddressModule],
  exports: [HeaderComponent],
  providers: [LanguageService],
})
export class HeaderModule {}
