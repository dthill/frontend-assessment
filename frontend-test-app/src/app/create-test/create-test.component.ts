import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { BackendService, Test } from '../services/backend.service'
import { BehaviorSubject, catchError, of, take } from 'rxjs'
import { Router } from '@angular/router'

@Component({
    selector: 'app-create-test',
    templateUrl: './create-test.component.html',
    styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {
    success$ = new BehaviorSubject<Number | null>(null)
    error$ = new BehaviorSubject(false)
    loading$ = new BehaviorSubject(false)
    testForm = new FormGroup({
        text: new FormControl('', [Validators.required]),
        questions: new FormArray([this.questionForm()]),
    })

    constructor(
        private backendService: BackendService,
        private router: Router
    ) {}

    get questions() {
        return this.testForm.get('questions') as FormArray
    }

    ngOnInit(): void {}

    addQuestion() {
        this.questions.push(this.questionForm())
    }

    addAnswer(questionIndex: number) {
        this.answers(questionIndex).push(this.answerForm())
    }

    answers(index: number) {
        return this.questions.get([index, 'answers']) as FormArray
    }

    answerForm() {
        return new FormGroup({
            text: new FormControl('', [Validators.required]),
            correct: new FormControl(false),
        })
    }

    questionForm() {
        return new FormGroup({
            text: new FormControl('', [Validators.required]),
            answers: new FormArray([this.answerForm()]),
        })
    }

    submit() {
        this.loading$.next(true)
        this.backendService
            .addTest(this.testForm.value as Test)
            .pipe(
                catchError(() => of(null)),
                take(1)
            )
            .subscribe((response: any) => {
                this.loading$.next(false)
                if (response === null) {
                    this.error$.next(true)
                } else {
                    this.success$.next(response)
                }
            })
    }
}
