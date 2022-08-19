import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subject, takeUntil } from 'rxjs'
import {
    QuestionProgress,
    TestProgress,
    TestProgressService,
    TestResults,
} from '../services/test-progress.service'

@Component({
    selector: 'app-take-test',
    templateUrl: './take-test.component.html',
    styleUrls: ['./take-test.component.scss'],
})
export class TakeTestComponent implements OnInit, OnDestroy {
    testProgress$: Observable<TestProgress | null>
    currentQuestion$: Observable<QuestionProgress | undefined>
    testComplete$: Observable<boolean>
    testResults$: Observable<TestResults>

    ngUnsubscribe = new Subject<void>()

    constructor(
        private testProgressService: TestProgressService,
        private activatedRoute: ActivatedRoute
    ) {
        this.testProgress$ = this.testProgressService.testProgress$
        this.currentQuestion$ = this.testProgressService.currentQuestion$
        this.testComplete$ = this.testProgressService.testComplete$
        this.testResults$ = this.testProgressService.testResults$
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((params) => {
                this.testProgressService.startTest(params.get('testId'))
            })
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next()
        this.ngUnsubscribe.complete()
    }
}
