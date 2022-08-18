import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TakeTestRoutingModule } from './take-test-routing.module'
import { TakeTestComponent } from './take-test.component'
import { QuestionComponent } from './question/question.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ResultsComponent } from './results/results.component';
import { CorrectStampComponent } from './results/correct-stamp/correct-stamp.component'

@NgModule({
    declarations: [TakeTestComponent, QuestionComponent, ResultsComponent, CorrectStampComponent],
    imports: [CommonModule, TakeTestRoutingModule, ReactiveFormsModule],
})
export class TakeTestModule {}
