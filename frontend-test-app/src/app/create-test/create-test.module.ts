import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CreateTestRoutingModule } from './create-test-routing.module'
import { CreateTestComponent } from './create-test.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateTestComponent],
    imports: [CommonModule, CreateTestRoutingModule, ReactiveFormsModule],
})
export class CreateTestModule {}
