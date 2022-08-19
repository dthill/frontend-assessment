import { Component, Input, OnInit, Output } from '@angular/core'
import {
    QuestionStatus,
    TestProgress,
    TestProgressService,
    TestResults,
} from '../../services/test-progress.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
    questionStatus = QuestionStatus

    @Input()
    testProgress!: TestProgress | null

    @Input()
    testResults!: TestResults | null

    constructor() {}

    ngOnInit(): void {}
}
