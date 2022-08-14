import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TakeTestRoutingModule } from './take-test-routing.module'
import { TakeTestComponent } from './take-test.component'
import { QuestionComponent } from './question/question.component'

@NgModule({
    declarations: [TakeTestComponent, QuestionComponent],
    imports: [CommonModule, TakeTestRoutingModule],
})
export class TakeTestModule {}
