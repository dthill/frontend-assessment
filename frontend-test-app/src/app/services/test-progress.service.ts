import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs'
import { Answer, BackendService, Test } from './backend.service'

@Injectable({
    providedIn: 'root',
})
export class TestProgressService {
    constructor(private backendService: BackendService) {}

    private _testProgress$ = new BehaviorSubject<TestProgress | null>(null)

    public get testProgress$() {
        return this._testProgress$.asObservable()
    }

    public get currentQuestion$(): Observable<QuestionProgress | undefined> {
        return this.testProgress$.pipe(
            filter((testProgress) => !!testProgress),
            map((testProgress) => {
                if (testProgress) {
                    return this.findCurrentQuestion(testProgress)
                }
                return undefined
            })
        )
    }

    public get testComplete$() {
        return this.testProgress$.pipe(
            map((testProgress) => {
                if (!testProgress) {
                    return false
                }
                return testProgress.questions.every(
                    (question) => question.answered
                )
            })
        )
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
            const testProgress: TestProgress = {
                ...test,
                questions: test.questions.map((question) => ({
                    ...question,
                    answered: false,
                    answers: question.answers.map((answer) => ({
                        ...answer,
                        answered: false,
                    })),
                })),
            } as TestProgress
            this._testProgress$.next(testProgress)
        })
    }

    public answerQuestion(answers: boolean[]) {
        const testProgress = this._testProgress$.value
        if (!testProgress) {
            throw new Error('test progress undefined')
        }
        const currentQuestion = this.findCurrentQuestion(testProgress)
        if (!currentQuestion) {
            throw new Error('current question undefined')
        }
        currentQuestion.answered = true
        currentQuestion.answers.forEach((answer, index) => {
            answer.answered = answers[index]
        })
        this._testProgress$.next(testProgress)
        console.log(this._testProgress$.value, answers)
    }

    findCurrentQuestion(
        testProgress: TestProgress
    ): QuestionProgress | undefined {
        return testProgress.questions.find((question) => !question.answered)
    }
}

export interface AnswerProgress extends Answer {
    id: number
    correct: boolean
    text: string
    answered: boolean
}

export interface QuestionProgress {
    id: number
    text: string
    answers: AnswerProgress[]
    answered: boolean
}

export interface TestProgress {
    id: number
    text: string
    questions: QuestionProgress[]
}
