import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { BehaviorSubject, Observable, take } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BackendService {
    constructor(private httpClient: HttpClient) {}

    addTest(test: Test) {
        return this.httpClient.post(`${environment.backendUrl}/api/test`, {
            test: test,
        })
    }

    getRandomTest(): Observable<Test> {
        return this.httpClient.get(`${environment.backendUrl}/api/test`) as any
    }

    getTest(id: number): Observable<Test> {
        return this.httpClient.get(
            `${environment.backendUrl}/api/test/${id}`
        ) as any
    }
}

export interface Answer {
    id?: number
    text: string
    correct: boolean
}

export interface Question {
    id?: number
    text: string
    answers: Answer[]
}

export interface Test {
    id?: number
    text: String
    questions: Question[]
}
