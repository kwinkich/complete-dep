import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';

@NgModule({
  exports: [InputComponent],
  declarations: [InputComponent],
  imports: [CommonModule],
})
export class InputModule {}
