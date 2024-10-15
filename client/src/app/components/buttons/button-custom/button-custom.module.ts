import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonCustomComponent } from './button-custom.component';

@NgModule({
  declarations: [ButtonCustomComponent],
  imports: [CommonModule],
  exports: [ButtonCustomComponent],
  providers: [],
})
export class ButtonCustomModule {}
