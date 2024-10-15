import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShortenAddressModule } from 'app/pipes/short-address.module';
import { ShowMiniModalService } from 'app/services/show-mini-modal/show-mini-modal.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, ShortenAddressModule],
  exports: [],
  providers: [ShowMiniModalService],
})
export class HeaderModule {}
