import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CreateTestComponent } from './create-test.component'

const routes: Routes = [{ path: '', component: CreateTestComponent }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreateTestRoutingModule {}
