import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavMobileComponent } from './nav-mobile.component';
import { LanguageService } from 'app/services/language/language.service';

@NgModule({
  exports: [NavMobileComponent],
  declarations: [NavMobileComponent],
  imports: [CommonModule],
  providers: [LanguageService],
})
export class NavMobileModule {}
