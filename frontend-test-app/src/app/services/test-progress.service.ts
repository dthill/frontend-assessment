import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs'
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
                    answerIds: null,
                })),
            })
        })
    }

    public answerQuestion(questionId: number, answerIds: number[]) {
        const currentProgress = this._testProgress$.value
        if (currentProgress == null) {
            throw new Error('Illegal state. Test progress can not be null.')
        }
        this._testProgress$.next({
            ...currentProgress,
            progress: currentProgress.progress.map((question) =>
                question.id === questionId
                    ? { ...question, answerIds }
                    : question
            ),
        })
    }

    public get currentQuestion$() {
        return this.testProgress$.pipe(
            filter((testProgress) => !!testProgress),
            map((testProgress) => {
                const currentQuestionId = testProgress?.progress.find(
                    (question) => question.answerIds === null
                )?.id
                if (!currentQuestionId || currentQuestionId < 0) {
                    return null
                }
                const currentQuestion = testProgress?.test.questions.find(
                    (question) => question.id === currentQuestionId
                )
                if (!currentQuestion) {
                    return null
                }
                return currentQuestion
            })
        )
    }

    public get testComplete$() {
        return this.testProgress$.pipe(
            map((testProgress) => {
                if (!testProgress) {
                    return false
                }
                return testProgress.progress.every(
                    (question) => question.answerIds !== null
                )
            })
        )
    }
}

export interface QuestionProgress {
    id: number
    answerIds: number[] | null
}

export interface TestProgress {
    test: Test
    progress: QuestionProgress[]
}
