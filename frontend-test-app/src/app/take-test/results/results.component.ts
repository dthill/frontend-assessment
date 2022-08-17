import { Component, Input, OnInit, Output } from '@angular/core'
import {
    TestProgress,
    TestProgressService,
} from '../../services/test-progress.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
    @Input()
    testProgress!: TestProgress | null

    constructor() {}

    ngOnInit(): void {}
}
