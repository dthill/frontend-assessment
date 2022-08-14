import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TakeTestComponent } from './take-test.component'

const routes: Routes = [
    { path: '', component: TakeTestComponent },
    { path: ':testId', component: TakeTestComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TakeTestRoutingModule {}
