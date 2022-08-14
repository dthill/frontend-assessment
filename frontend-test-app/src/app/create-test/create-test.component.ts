import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { BackendService, Test } from '../services/backend.service'
import { take } from 'rxjs'

@Component({
    selector: 'app-create-test',
    templateUrl: './create-test.component.html',
    styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {
    testForm = new FormGroup({
        text: new FormControl('', [Validators.required]),
        questions: new FormArray([this.questionForm()]),
    })

    constructor(private backendService: BackendService) {}

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
        console.log(JSON.stringify(this.testForm.value, null, 2))
        this.backendService
            .addTest(this.testForm.value as Test)
            .pipe(take(1))
            .subscribe((response) => {
                console.log(response)
            })
    }
}
