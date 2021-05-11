import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
    imports: [CommonModule, TranslateModule, SignupRoutingModule, FormsModule],
    declarations: [SignupComponent]
})
export class SignupModule {}
