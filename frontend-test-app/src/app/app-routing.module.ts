import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'create-test',
        loadChildren: () =>
            import('./create-test/create-test.module').then(
                (m) => m.CreateTestModule
            ),
    },
    {
        path: '',
        loadChildren: () =>
            import('./take-test/take-test.module').then(
                (m) => m.TakeTestModule
            ),
    },
    {
        path: '**',
        loadChildren: () =>
            import('./take-test/take-test.module').then(
                (m) => m.TakeTestModule
            ),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
