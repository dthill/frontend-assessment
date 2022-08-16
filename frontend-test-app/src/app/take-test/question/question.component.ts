import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Question } from '../../services/backend.service'
import { FormArray, FormControl } from '@angular/forms'
import { map, Observable, Subject, take, takeUntil, tap } from 'rxjs'
import {
    QuestionProgress,
    TestProgressService,
} from '../../services/test-progress.service'

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
    @Input()
    question$!: Observable<QuestionProgress | undefined>

    answerForm = new FormArray<FormControl>([])
    ngUnsubscribe = new Subject<void>()

    constructor(private testProgressService: TestProgressService) {}

    ngOnInit(): void {
        this.question$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((question) => {
                if (!question) {
                    return
                }
                this.answerForm = new FormArray<FormControl>(
                    question.answers.map(() => new FormControl(false))
                )
            })
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.complete()
    }

    answer(event: Event) {
        event.preventDefault()
        this.testProgressService.answerQuestion(this.answerForm.value)
    }

    getAnswerText(index: number) {
        return this.question$.pipe(
            map((question) => question?.answers?.[index]?.text)
        )
    }
    getAnswerId(index: number) {
        return this.question$.pipe(
            map((question) => question?.answers?.[index]?.id)
        )
    }

    trackByFn(index: number, answer: any) {
        return index + '_' + answer?.id
    }
}
