import { Component, Input, OnInit } from '@angular/core'
import { Question } from '../../services/backend.service'
import { FormArray, FormControl } from '@angular/forms'
import { map, Observable, take } from 'rxjs'

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
    @Input()
    question$!: Observable<Question | null>

    answerForm = new FormArray<FormControl>([])

    constructor() {}

    ngOnInit(): void {
        this.question$.pipe(take(1)).subscribe((question) => {
            question?.answers.forEach((answer) => {
                this.answerForm.push(new FormControl(false))
            })
        })
    }

    answer(event: Event) {
        event.preventDefault()
        console.log(this.answerForm.value)
    }

    getQuestionText(index: number) {
        return this.question$.pipe(
            map((question) => question?.answers[index].text)
        )
    }
}
