import { TestBed } from '@angular/core/testing'

import { TestProgressService } from './test-progress.service'

describe('TestProgressService', () => {
    let service: TestProgressService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(TestProgressService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
