import { Component, OnDestroy, OnInit } from '@angular/core'
import { BackendService, Question, Test } from '../services/backend.service'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subject, takeUntil, tap } from 'rxjs'
import {
    TestProgress,
    TestProgressService,
} from '../services/test-progress.service'

@Component({
    selector: 'app-take-test',
    templateUrl: './take-test.component.html',
    styleUrls: ['./take-test.component.scss'],
})
export class TakeTestComponent implements OnInit, OnDestroy {
    testProgress$: Observable<TestProgress>
    currentQuestion$: Observable<Question | null>
    testComplete$: Observable<boolean>
    ngUnsubscribe = new Subject<void>()

    constructor(
        private testProgressService: TestProgressService,
        private activatedRoute: ActivatedRoute
    ) {
        this.testProgress$ = this.testProgressService
            .testProgress$ as Observable<TestProgress>
        this.currentQuestion$ = this.testProgressService.currentQuestion$
        this.testComplete$ = this.testProgressService.testComplete$
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
