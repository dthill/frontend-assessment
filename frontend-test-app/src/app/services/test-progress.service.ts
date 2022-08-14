import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, take } from 'rxjs'
import { BackendService, Test } from './backend.service'

@Injectable({
    providedIn: 'root',
})
export class TestProgressService {
    private _testProgress$ = new BehaviorSubject<TestProgress | null>(null)

    constructor(private backendService: BackendService) {}

    public get testProgress$() {
        return this._testProgress$.asObservable()
    }

    public startTest(stringId?: string | null) {
        let test$: Observable<Test>
        const id = parseInt(stringId as any)
        if (id) {
            test$ = this.backendService.getTest(id)
        } else {
            test$ = this.backendService.getRandomTest()
        }
        test$.pipe(take(1)).subscribe((test) => {
            this._testProgress$.next({
                test,
                progress: test.questions.map((question) => ({
                    id: question.id as number,
                    answerId: -1,
                })),
            })
        })
    }

    public answerQuestion(questionId: number, answerId: number) {
        const currentProgress = this._testProgress$.value
        if (currentProgress == null) {
            throw new Error('Illegal state. Test progress can not be null.')
        }
        this._testProgress$.next({
            ...currentProgress,
            progress: currentProgress.progress.map((question) =>
                question.id === questionId
                    ? { ...question, answerId }
                    : question
            ),
        })
    }
}

export interface QuestionProgress {
    id: number
    answerId: number
}

export interface TestProgress {
    test: Test
    progress: QuestionProgress[]
}
